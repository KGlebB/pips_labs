import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';
import { join } from 'path';
import { DatasetService } from './dataset.service';
import { Cron } from '@nestjs/schedule';
import { existsSync, readFileSync, unlinkSync, renameSync } from 'fs';

@Injectable()
export class ModelService {
  private readonly pythonScriptsPath = join(process.cwd(), 'scripts');
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly datasetService: DatasetService) {}

  @Cron('*/15 * * * *')
  async handleNewData() {
    this.logger.verbose('Обучение новой модели');
    await this.datasetService.createCsv();
    await this.trainModel('new_');
    try {
      const newMetricsPath = join('files', 'new_model_metrics.json');
      if (!existsSync(newMetricsPath)) {
        throw new Error('New model metrics not found');
      }
      const oldMetricsPath = join('files', 'old_model_metrics.json');
      const hasOldModel = existsSync(oldMetricsPath);
      if (!hasOldModel) {
        this.renameModelFiles('new_', 'old_');
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newMetrics: Record<string, number> = JSON.parse(
          readFileSync(newMetricsPath, 'utf-8'),
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const oldMetrics: Record<string, number> = JSON.parse(
          readFileSync(oldMetricsPath, 'utf-8'),
        );
        this.logger.verbose(
          `Сравнение новой и старой моделей (${newMetrics.MSE} vs ${oldMetrics.MSE})`,
        );
        if (newMetrics.MSE < oldMetrics.MSE) {
          this.deleteModelFiles('old_');
          this.renameModelFiles('new_', 'old_');
          this.logger.log('Новая обученная модель оказалась лучше.');
        } else {
          this.deleteModelFiles('new_');
          this.logger.log('Старая модель оказалась лучше.');
        }
      }
    } catch (error) {
      this.logger.error('Ошибка при обновлении модели:', error);
    }
  }

  private renameModelFiles(oldPrefix: string, newPrefix: string) {
    const files = [
      'model_metrics.json',
      'best_gb_model.pkl',
      'tfidf_vectorizer.pkl',
    ];
    files.forEach((file) => {
      const oldPath = join('files', `${oldPrefix}${file}`);
      const newPath = join('files', `${newPrefix}${file}`);
      if (existsSync(oldPath)) {
        renameSync(oldPath, newPath);
      }
    });
  }

  private deleteModelFiles(prefix: string) {
    const files = [
      'model_metrics.json',
      'best_gb_model.pkl',
      'tfidf_vectorizer.pkl',
    ];
    files.forEach((file) => {
      const path = join('files', `${prefix}${file}`);
      if (existsSync(path)) {
        unlinkSync(path);
      }
    });
  }

  async trainModel(prefix: string): Promise<string> {
    const path = join('files', prefix);
    return new Promise((resolve, reject) => {
      const trainProcess = spawn('python', [
        join(this.pythonScriptsPath, 'train.py'),
        '--prefix',
        path,
      ]);

      let output = '';
      let errorOutput = '';

      trainProcess.stdout.on('data', (data: string) => {
        output += data.toString();
      });

      trainProcess.stderr.on('data', (data: string) => {
        errorOutput += data.toString();
      });

      trainProcess.on('close', (code) => {
        if (code === 0) {
          resolve(`Training completed successfully. Output: ${output}`);
        } else {
          reject(
            new Error(
              `Training failed with code ${code}. Error: ${errorOutput || output}`,
            ),
          );
        }
      });

      trainProcess.on('error', (err) => {
        reject(new Error(`Failed to start training process: ${err.message}`));
      });
    });
  }

  async predictTonality(text: string, modelPrefix = 'old_'): Promise<number> {
    const modelPath = join('files', modelPrefix);
    return new Promise((resolve, reject) => {
      const predictProcess = spawn('python', [
        join(this.pythonScriptsPath, 'use.py'),
        '--text',
        text,
        '--model_path',
        modelPath,
      ]);

      let output = '';
      let errorOutput = '';

      predictProcess.stdout.on('data', (data: string) => {
        output += data.toString();
      });

      predictProcess.stderr.on('data', (data: string) => {
        errorOutput += data.toString();
      });

      predictProcess.on('close', (code) => {
        if (code === 0) {
          const result = parseFloat(output.split(':')[1].trim());
          resolve(result);
        } else {
          reject(
            new Error(
              `Prediction failed with code ${code}. Error: ${errorOutput || output}`,
            ),
          );
        }
      });

      predictProcess.on('error', (err) => {
        reject(new Error(`Failed to start prediction process: ${err.message}`));
      });
    });
  }
}
