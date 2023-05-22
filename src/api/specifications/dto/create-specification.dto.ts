import { IsNotEmpty, IsOptional } from 'class-validator';
import { Campaign } from 'src/api/campaign/entities/campaign.entity';

export class CreateSpecificationDto {
  @IsNotEmpty()
  media: string;
  @IsNotEmpty()
  bannerSize: string;
  @IsOptional()
  bannerFreq: number;
  @IsNotEmpty()
  seconds: number;
  @IsOptional()
  secondsFreq: number;
  @IsNotEmpty()
  logoSize: string;
  @IsOptional()
  logoFreq: number;
  @IsOptional()
  campId: number;
  campaign: Campaign;

}
