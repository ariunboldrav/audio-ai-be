import { IsNotEmpty } from 'class-validator';
import { Campaign } from 'src/api/campaign/entities/campaign.entity';

export class CreateSpecificationDto {
  @IsNotEmpty()
  media: string;
  @IsNotEmpty()
  bannerSize: string;
  @IsNotEmpty()
  @IsNotEmpty()
  bannerFreq: number;
  @IsNotEmpty()
  seconds: number;
  @IsNotEmpty()
  secondsFreq: number;
  @IsNotEmpty()
  logoSize: string;
  @IsNotEmpty()
  logoFreq: number;
  campaign: Campaign;
  campId: number;
}
