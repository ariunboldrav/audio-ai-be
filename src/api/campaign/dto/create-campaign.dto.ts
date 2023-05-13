import { IsNotEmpty } from "class-validator";
import { Company } from "src/api/company/entities/company.entity";

export class CreateCampaignDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    brandName: string

    @IsNotEmpty()
    totalBudget: number

    @IsNotEmpty()
    createBudget: number

    @IsNotEmpty()
    endDate: string

    @IsNotEmpty()
    startDate: string

    // Relation
    company: Company

    // @IsNotEmpty()
    // compId: number
}
