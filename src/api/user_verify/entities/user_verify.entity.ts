import { Length } from "class-validator";
import { _BaseEntity } from "src/api/_base.entity";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserVerify extends _BaseEntity {
    @PrimaryGeneratedColumn()
    public _id: number;

    @PrimaryColumn()
    public userId: number;

    @Column({nullable: false})
    public docID: string

    @Column({nullable: false, type: 'varchar', length: 100})
    @Length(3, 100)
    public firstName: string;

    @Column({nullable: false, type: 'varchar', length: 100})
    @Length(3, 100)
    public lastName: string;

    @Column({nullable: false, type: 'varchar', length: 500})
    public idPath: string;
}
