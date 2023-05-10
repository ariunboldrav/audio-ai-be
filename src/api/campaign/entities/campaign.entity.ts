import { _BaseEntity } from 'src/api/_base.entity';
import { Company } from 'src/api/company/entities/company.entity';
import { Content } from 'src/api/content/entities/content.entity';
import { FileAnswer } from 'src/api/file_answers/entities/file_answer.entity';
import { Specification } from 'src/api/specifications/entities/specification.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Campaign extends _BaseEntity {

  // Campaign name
  @Column({ name: 'name' })
  name: string;
  
  // Brand Name
  @Column({ name: 'brand_name' })
  brand_name: string;
  
  // Ads total price
  @Column({ name: 'serving_budget', type: 'decimal' })
  total_budget: number;

  // Ad's unit/day price 
  @Column({ name: 'create_budget', type: 'decimal' })
  create_budget: number;
  
  // This field must be relations
  @ManyToOne(() => Company, (company) => company.campaigns)
  @JoinColumn({name: 'company_id'})
  company: Company;

  @OneToOne(() => Content, c => c.campaign)
  contents: Content

  @OneToOne(() => Specification, s => s.campaign)
  specs: Specification

  @OneToMany(() => FileAnswer, f => f.campaign)
  fileAnswers: FileAnswer[]

  // Maybe clients reuse that ad's dates will be abstract
  @Column({ name: 'when_start', default: () => 'CURRENT_TIMESTAMP(6)'})
  when_start: Date;

  @Column({ name: 'when_end', nullable: false})
  when_end: Date;

  @OneToMany(() => Specification, spec=> spec.campaign)
  specifications: Specification[]
}
