import { _BaseEntity } from 'src/api/_base.entity';
import { Answer } from 'src/api/answers/entities/answer.entity';
import { Company } from 'src/api/companies/entities/company.entity';
import { Question } from 'src/api/questions/entities/question.entity';
import { Column, ManyToMany, ManyToOne } from 'typeorm';

export class CompanyAnswer extends _BaseEntity {
  @ManyToMany(() => Question, (q) => q.id)
  question: Question;

  @ManyToOne(() => Company, (c) => c.id)
  company: Company;

  @ManyToOne(() => Answer, (a) => a.id)
  answer: Answer;

  @Column({ nullable: true})
  other: string;

  @Column({nullable: true, name: 'other_price', type: 'decimal'})
  other_price: number
}
