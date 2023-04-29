import { _BaseEntity } from "src/api/_base.entity";
import { Question } from "src/api/questions/entities/question.entity";
import { Column, ManyToOne, PrimaryColumn } from "typeorm";

export class Answer extends _BaseEntity {

    @Column()
    answer: string

    @Column({nullable: true})
    info: string

    @ManyToOne(() => Question, (q) => q.id)
    question: Question

}
