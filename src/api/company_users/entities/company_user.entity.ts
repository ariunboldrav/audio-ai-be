import { Company } from "src/api/companies/entities/company.entity";
import { User } from "src/api/users/entities/user.entity";
import { ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class CompanyUser {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.id)
    user_id: User


    @ManyToOne(() => Company, (company) => company.id)
    company_id: Company
}
