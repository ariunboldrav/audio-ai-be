import { _BaseEntity } from 'src/api/_base.entity';
import { Answer } from 'src/api/answers/entities/answer.entity';
import { CompanyAnswer } from 'src/api/company_answers/entities/company_answer.entity';
import { Column, OneToMany } from 'typeorm';

export class Question extends _BaseEntity {
  @Column({ unique: true })
  question: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @Column({nullable: true})
  info: string

  @OneToMany(() => CompanyAnswer, (ca) => ca.question)
  companyAnswer: CompanyAnswer[]
}
