import { IsEmail, IsPhoneNumber, Length, Min } from "class-validator";
import { _BaseEntity } from "src/api/_base.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Company } from "src/api/company/entities/company.entity";
import { Logger } from "@nestjs/common";
import { Exclude } from "class-transformer";

@Entity()
export class User extends _BaseEntity {
    @Column({nullable: false, type:'varchar'})
    public full_name: string;

    @Column({unique: true, nullable: false, type:'varchar'})
    @IsEmail()
    public email: string;

    @Column({unique: true, nullable:false, type: 'varchar', length: 15})
    @IsPhoneNumber()
    public phone: string;

    @Column({default: true})
    public is_active: boolean;

    @Column({nullable:false, type: 'varchar'})
    @Min(6)
    @Exclude()
    public password: string;

    @Column({nullable:true, type: 'varchar'})
    public avatar: string;

    @Column({type: 'boolean', default: false})
    public is_deleted: false

    @OneToMany(() => Company, (c) => c.user)
    companies: Company[]

    // @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    @CreateDateColumn({ type: "timestamp", default: null, nullable: true })
    public deleted_at: Date;

    // @BeforeInsert()
    // @BeforeUpdate()
    // async hashPassword() {
    //     const saltRounds = 10
    //     this.password = await bcrypt.hash(this.password, saltRounds);
    // }
}
