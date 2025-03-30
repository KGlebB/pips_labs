import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Aggregator extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Article, (article) => article.aggregator, {
    orphanedRowAction: 'delete',
  })
  articles: Article[];

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  url: string;
}
