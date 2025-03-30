import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Aggregator } from './aggregator.entity';
import { Prediction } from './prediction.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aggregator, (aggregator) => aggregator.articles, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  aggregator: Aggregator;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: '' })
  tags: string;

  @Column()
  url: string;

  @OneToMany(() => Prediction, (prediction) => prediction.article, {
    orphanedRowAction: 'delete',
  })
  predictions: string;

  @CreateDateColumn()
  createdAt: string;
}
