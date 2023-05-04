import { IsEmail, IsPhoneNumber, Length, Min } from "class-validator";
import { _BaseEntity } from "src/api/_base.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends _BaseEntity {

    @Column({unique: true, nullable: false, type:'varchar'})
    @IsEmail()
    public email: string;

    @Column({unique: true, nullable:false, type: 'varchar', length: 15})
    @IsPhoneNumber()
    public phone_no: string;

    @Column({default: true})
    public is_active: boolean;

    @Column({nullable:false, type: 'varchar'})
    @Min(6)
    public password: string;

    @Column({nullable:true, type: 'varchar'})
    public avatar: string;

    @Column({type: 'boolean', default: false})
    public is_deleted: false

    // @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    @CreateDateColumn({ type: "timestamp", default: null, nullable: true })
    public deleted_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const saltRounds = parseInt(process.env.HASH_SALT);
        this.password = await bcrypt.hash(this.password, saltRounds);
        console.log('Password: '+this.password)
    }
}
