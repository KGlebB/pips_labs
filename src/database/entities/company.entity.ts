import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Prediction } from './prediction.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ default: '' })
  aliases: string;

  @OneToMany(() => Prediction, (prediction) => prediction.company, {
    orphanedRowAction: 'delete',
  })
  predictions: string;
}
