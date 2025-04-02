import { Injectable, Logger } from '@nestjs/common';
import { ArticlesService } from 'src/database/services/articles.service';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class DatasetService {
  private readonly logger = new Logger(this.constructor.name);
  constructor(private readonly articlesService: ArticlesService) {}

  async createCsv(): Promise<void> {
    const articles = await this.articlesService.getLastWithExpertScore();
    if (articles.length === 0) {
      return;
    }
    const csvHeader = 'title,tonality';
    const csvRows = articles.map((article) => {
      const escapedTitle = article.title.replace(/"/g, '""');
      return `"${escapedTitle}",${article.expertScore}`;
    });
    const csvContent = [csvHeader, ...csvRows].join('\n');
    const dirPath = join(process.cwd(), 'files');
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
    const filePath = join(dirPath, 'test_data.csv');
    await writeFile(filePath, csvContent, 'utf8');
  }
}
