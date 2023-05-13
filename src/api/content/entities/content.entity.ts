import { _BaseEntity } from 'src/api/_base.entity';
import { Campaign } from 'src/api/campaign/entities/campaign.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Content extends _BaseEntity {
  @OneToOne(() => Campaign, (c) => c.content, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @Column({ type: 'text' })
  goal: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  hope: string;

  @Column({ type: 'text' })
  target_audience: string;

  @Column({ type: 'text' })
  style_adv: string;

  @Column({ type: 'text' })
  audience_feel: string;

  @Column({ type: 'text' })
  character_or_tone: string;

  @Column({ type: 'text' })
  features: string;

  @Column({ type: 'text' })
  key_messages: string;

  @Column({ type: 'text' })
  guideline_tone: string;

  @Column({ type: 'text' })
  comments: string;
}
