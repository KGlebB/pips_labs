import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs/promises';
import { ArticlesService } from 'src/database/services/articles.service';
import { ModelService } from 'src/model/services/model.service';

@Injectable()
export class ParserService implements OnModuleInit {
  private readonly logger = new Logger(ParserService.name);
  private articlesData: Array<{
    title: string;
    link: string;
    summary: string;
    score: string;
    companies: string[];
  }> = [];
  private currentLine = 0;

  constructor(
    private readonly articlesService: ArticlesService,
    private readonly modelService: ModelService,
  ) {}

  async onModuleInit() {
    const content = await fs.readFile('misc/mock_data.tsv', 'utf-8');
    const lines = content.split('\n').filter((line) => line.trim() !== '');
    if (lines.length === 0) {
      throw new Error('TSV-файл пустой');
    }
    const headers = lines[0].split('\t');
    this.articlesData = lines.slice(1).map((line) => {
      const values = line.split('\t');
      const entry: Record<string, string> = {};
      headers.forEach((header, index) => {
        entry[header] = values[index]?.trim() || '';
      });
      entry['tickers'] = entry['tickers'].replaceAll("'", '"');
      let companies: string[] = [];
      if (entry.tickers.length > 0) {
        companies = JSON.parse(entry['tickers']) as string[];
      }
      return {
        title: entry['title'],
        link: entry['link'],
        summary: entry['summary'],
        score: entry['score'],
        companies,
      };
    });
  }

  async getNewArticles() {
    for (let i = 0; i < 10; ++i) {
      await this.getNewArticle();
    }
  }

  @Cron('* * * * *')
  async getNewArticle() {
    if (this.articlesData.length === 0) {
      throw new Error('Нет данных для загрузки');
    }
    if (this.currentLine >= this.articlesData.length) {
      this.currentLine = 0;
    }
    const data = this.articlesData[this.currentLine];
    this.currentLine++;
    try {
      const article = await this.articlesService.create(
        {
          title: data.title,
          slug: Array.from(
            { length: 16 },
            () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)],
          ).join(''),
          aggregator: { id: 1 },
          url: data.link,
          content: data.summary,
          prediction: await this.modelService.predictTonality(data.title),
        },
        data.companies,
      );
      this.logger.verbose(
        `Из новостного источника извлечена новость #${article.id} // Парсинг новостного сайта`,
      );
      const score = parseFloat(data.score);
      if (!isNaN(score)) {
        const timeout = 40 * 60 * 1000;
        setTimeout(() => {
          this.articlesService
            .update(article.id, {
              expertScore: score,
            })
            .then(() => {
              this.logger.verbose(
                `Получена экспертная оценка для новости #${article.id} // Интеграция с аутсорсом`,
              );
            })
            .catch((error) => {
              this.logger.error(
                `Ошибка установки экспертной оценки ${article.id}: ${error}`,
              );
            });
        }, timeout);
      } else {
        this.logger.warn(
          `Нет экспертной оценки '${data.score}' для новости ${article.id}.`,
        );
      }
      return article;
    } catch (error) {
      this.logger.error(
        `Невозможно создать статью #${this.currentLine - 1}: ${error}`,
      );
      throw error;
    }
  }
}
