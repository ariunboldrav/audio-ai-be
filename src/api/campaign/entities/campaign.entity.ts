import { _BaseEntity } from 'src/api/_base.entity';
import { Company } from 'src/api/company/entities/company.entity';
import { Content } from 'src/api/content/entities/content.entity';
import { FileAnswer } from 'src/api/file_answers/entities/file_answer.entity';
import { Specification } from 'src/api/specifications/entities/specification.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Campaign extends _BaseEntity {
  // Campaign name
  @Column({ name: 'name' })
  name: string;

  // Brand Name
  @Column({ name: 'brand_name' })
  brand_name: string;

  // Ads total price
  @Column({ name: 'total_budget', type: 'decimal' })
  total_budget: number;

  // Ad's unit/day price
  @Column({ name: 'create_budget', type: 'decimal' })
  create_budget: number;

  // This field must be relations
  @ManyToOne(() => Company, (company) => company.campaigns, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToOne(() => Content, (c) => c.campaign, { onDelete: 'CASCADE' })
  content: Content;

  @OneToOne(() => Specification, (s) => s.campaign, { onDelete: 'CASCADE' })
  spec: Specification;

  @OneToOne(() => FileAnswer, (f) => f.campaign, { onDelete: 'CASCADE' })
  fileAnswer: FileAnswer;

  // Maybe clients reuse that ad's dates will be abstract
  @Column({ name: 'when_start', nullable: false })
  when_start: Date;

  @Column({ name: 'when_end', nullable: false })
  when_end: Date;
}
