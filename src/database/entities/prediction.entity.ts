import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Article } from './article.entity';
import { Company } from './company.entity';

@Entity()
export class Prediction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.predictions, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  company: Company;

  @ManyToOne(() => Article, (article) => article.predictions, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  article: Article;
}
