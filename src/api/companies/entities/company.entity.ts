import { _BaseEntity } from "src/api/_base.entity";
import { Column, PrimaryColumn, Unique } from "typeorm";

export class Company extends _BaseEntity {
    @Column({unique: true, length: 100})
    name: string

    @Column({ length: 500})
    logo: string

    @Column({length: 100})
    contact_name: string
    
    @Column({length: 200})
    contact_email: string

    @Column()
    contact_phone: string

    @PrimaryColumn()
    user_id: number
}
