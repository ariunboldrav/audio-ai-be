import { _BaseEntity } from "src/api/_base.entity";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class FileAnswer extends _BaseEntity {
    @PrimaryColumn()
    campaign_id: number

    @PrimaryColumn()
    type_id: number

    @Column({})
    answer: string
}
