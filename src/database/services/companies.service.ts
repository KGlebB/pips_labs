import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { COMPANIES_SEED } from '../seeds/companies.seed';

@Injectable()
export class CompaniesService implements OnModuleInit {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(Company) private readonly repository: Repository<Company>,
  ) {}

  async onModuleInit(): Promise<void> {
    const count = await this.repository.count();
    if (count === 0) {
      await this.repository.save(COMPANIES_SEED);
      this.logger.log('Инициализация компаний');
    }
  }

  async getBySlug(slug: string): Promise<Company | null> {
    return this.repository.findOneBy({ slug });
  }
}
