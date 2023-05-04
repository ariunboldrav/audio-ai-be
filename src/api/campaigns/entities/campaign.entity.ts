import { _BaseEntity } from 'src/api/_base.entity';
import { Company } from 'src/api/companies/entities/company.entity';
import { Specification } from 'src/api/specifications/entities/specification.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';

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
  company: Company;

  //   Maybe clients reuse that ad's dates will be abstract
//   @Column({ name: 'when_start', default: () => 'CURRENT_TIMESTAMP(6)'})
//   when_start: Date;

//   @Column({ name: 'when_end', default: () => 'CURRENT_TIMESTAMP(6)'})
//   when_end: Date;

    @OneToMany(() => Specification, spec=> spec.campaign)
    specifications: Specification[]
}
