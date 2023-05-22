import { _BaseEntity } from "src/api/_base.entity";
import { FileAnswer } from "src/api/file_answers/entities/file_answer.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class FileType extends _BaseEntity {
    @Column()
    types: string

    @Column()
    info: string
}
