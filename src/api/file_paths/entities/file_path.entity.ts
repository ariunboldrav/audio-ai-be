import { _BaseEntity } from "src/api/_base.entity";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class FilePath extends _BaseEntity {
    @PrimaryColumn()
    answer_id: number

    @Column({nullable: false})
    path: string
}
