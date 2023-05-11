import { IsNotEmpty } from 'class-validator';
import { Campaign } from 'src/api/campaign/entities/campaign.entity';

export class CreateContentDto {
  campaign: Campaign;
  @IsNotEmpty()
  audienceFeel: string;
  @IsNotEmpty()
  characterOrTone: string;
  @IsNotEmpty()
  comments: string;
  @IsNotEmpty()
  goal: string;
  @IsNotEmpty()
  keyMessages: string;
  @IsNotEmpty()
  features: string;
  @IsNotEmpty()
  hope: string;
  @IsNotEmpty()
  styleAdv: string;
  @IsNotEmpty()
  guidelineTone: string;
  @IsNotEmpty()
  targetAudience: string;
}
