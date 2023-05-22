import { IsNotEmpty, IsOptional } from 'class-validator';
import { Campaign } from 'src/api/campaign/entities/campaign.entity';

export class CreateSpecificationDto {
  @IsNotEmpty({ message: 'JPN-Required!' })
  media: string;
  @IsNotEmpty({ message: 'JPN-Required!' })
  bannerSize: string;
  @IsOptional()
  bannerFreq: number;
  @IsNotEmpty({ message: 'JPN-Required!' })
  seconds: number;
  @IsOptional()
  secondsFreq: number;
  @IsNotEmpty({ message: 'JPN-Required!' })
  logoSize: string;
  @IsOptional()
  logoFreq: number;
  @IsOptional()
  campId: number;
  campaign: Campaign;

}
