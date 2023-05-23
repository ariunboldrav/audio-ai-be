import { IsNotEmpty, IsOptional } from "class-validator";
import { Company } from "src/api/company/entities/company.entity";

export class CreateCampaignDto {
    @IsNotEmpty({ message: 'JPN-Required!' })
    name: string

    @IsNotEmpty({ message: 'JPN-Required!' })
    brandName: string

    @IsNotEmpty({ message: 'JPN-Required!' })
    totalBudget: number

    @IsNotEmpty({ message: 'JPN-Required!' })
    createBudget: number

    @IsNotEmpty({ message: 'JPN-Required!' })
    endDate: string

    @IsNotEmpty({ message: 'JPN-Required!' })
    startDate: string

    // Relation
    company: Company

    @IsOptional()
    campId: number

    // @IsNotEmpty({ message: 'JPN-Required!' })
    // compId: number
}
