import { _BaseEntity } from "src/api/_base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class FileType extends _BaseEntity {
    @Column()
    types: string

    @Column()
    info: string
}
