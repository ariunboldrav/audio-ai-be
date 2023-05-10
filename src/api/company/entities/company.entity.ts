import { _BaseEntity } from "src/api/_base.entity";
import { Campaign } from "src/api/campaign/entities/campaign.entity";
import { User } from "src/api/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, Unique } from "typeorm";

@Entity()
export class Company extends _BaseEntity {
    @Column({unique: true, nullable: false, type:'varchar'})
    name: string

    @Column({nullable: true, type:'varchar'})
    desc: string
    
    @ManyToOne(() => User, (u) => u.companies)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToMany(() => Campaign, campaign => campaign.company)
    campaigns: Campaign[]
}
