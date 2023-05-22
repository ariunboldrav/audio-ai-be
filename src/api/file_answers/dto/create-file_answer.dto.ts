import { IsNotEmpty, IsOptional } from 'class-validator';
import { Campaign } from 'src/api/campaign/entities/campaign.entity';

export class CreateFileAnswerDto {
  @IsNotEmpty({ message: 'JPN-Required!' })
  answerOne: string;
  @IsNotEmpty({ message: 'JPN-Required!' })
  answerTwo: string;
  @IsNotEmpty({ message: 'JPN-Required!' })
  answerThree: string;
  @IsNotEmpty({ message: 'JPN-Required!' })
  answerFour: string;

  @IsOptional()
  fileOne: string;
  @IsOptional()
  fileTwo: string;
  @IsOptional()
  fileThree: string;
  @IsOptional()
  fileFour: string;

  campaign: Campaign
}
