import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { Campaign } from 'src/api/campaign/entities/campaign.entity';

export class CreateContentDto {
  campaign: Campaign;
  @IsOptional()
  content: string;
  @IsOptional()
  desired: string;
  @IsOptional()
  goal: string;
  @IsOptional()
  targetAudience: string;
  @IsOptional()
  styleAdv: string;
  @IsOptional()
  audienceFeel: string;
  @IsOptional()
  hope: string;
  @IsOptional()
  features: string;
  @IsOptional()
  keyMessages: string;
  @IsOptional()
  guidelineTone: string;
  @IsOptional()
  comments: string;
}
