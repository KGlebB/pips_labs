import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { ArticlesService } from 'src/database/services/articles.service';
import { CompaniesService } from 'src/database/services/companies.service';

@Controller()
export class HttpController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Get(['', 'articles'])
  @Render('articles')
  async getArticles(@Query('page') page = 0) {
    const articles = await this.articlesService.getMany(page);
    return { articles, page };
  }

  @Get('article/:articleId')
  @Render('article')
  async getArticle(@Param('articleId') id: number) {
    const article = await this.articlesService.getOne(id);
    return { article, id };
  }

  @Get('companies')
  @Render('companies')
  async getCompanies() {
    const companies = await this.companiesService.getAll();
    return { companies };
  }

  @Get('company/:companyId')
  @Render('company')
  async getCompany(@Param('companyId') id: number) {
    const company = await this.companiesService.getOne(id);
    return { company, id };
  }
}
