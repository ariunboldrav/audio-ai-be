import { Campaign } from "src/api/campaign/entities/campaign.entity";

export class CreateContentDto {
  campaign: Campaign;
  audienceFeel: string;
  characterOrTone: string;
  comments: string;
  goal: string;
  keyMessages: string;
  features: string;
}
