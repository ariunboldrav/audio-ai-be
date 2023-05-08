import { _BaseEntity } from "src/api/_base.entity";
import { Campaign } from "src/api/campaigns/entities/campaign.entity";
import { User } from "src/api/users/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, Unique } from "typeorm";

@Entity()
export class Company extends _BaseEntity {
    @Column({unique: true, length: 200})
    name: string

    @PrimaryColumn()
    user_id: number

    @OneToMany(() => Campaign, campaign => campaign.company)
    campaigns: Campaign[]
}
