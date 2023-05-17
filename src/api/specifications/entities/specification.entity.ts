import { _BaseEntity } from 'src/api/_base.entity';
import { Campaign } from 'src/api/campaign/entities/campaign.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Specification extends _BaseEntity {
  @Column({ name: 'media' })
  media: string;

  @Column({ name: 'seconds', nullable: true, default: 30 })
  seconds: number;

  @Column({ name: 'seconds_freq', nullable: true, default: 0 })
  seconds_freq: number;

  @Column({ name: 'banner_size', default: '640x640', nullable: true })
  banner_size: string;

  @Column({ name: 'banner_freq', nullable: true, default: 0 })
  banner_freq: number;

  @Column({ name: 'logo_size', default: '112x112', nullable: true })
  logo_size: string;

  @Column({ name: 'logo_freq', default: '1', nullable: true })
  logo_freq: number;

  @OneToOne(() => Campaign, (campaign) => campaign.spec, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;
  
}
