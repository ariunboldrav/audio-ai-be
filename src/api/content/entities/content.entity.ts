import { _BaseEntity } from 'src/api/_base.entity';
import { Campaign } from 'src/api/campaign/entities/campaign.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Content extends _BaseEntity {
  @OneToOne(() => Campaign, (c) => c.content, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @Column({ type: 'text', nullable: true})
  goal: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'text', nullable: true })
  desired: string;

  @Column({ type: 'text', nullable: true })
  hope: string;

  @Column({ type: 'text', nullable: true })
  target_audience: string;

  @Column({ type: 'text', nullable: true })
  style_adv: string;

  @Column({ type: 'text', nullable: true })
  audience_feel: string;

  @Column({ type: 'text', nullable: true })
  features: string;

  @Column({ type: 'text', nullable: true })
  key_messages: string;

  @Column({ type: 'text', nullable: true })
  guideline_tone: string;

  @Column({ type: 'text', nullable: true })
  comments: string;
}
