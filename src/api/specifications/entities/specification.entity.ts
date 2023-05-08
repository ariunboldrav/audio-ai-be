import { _BaseEntity } from 'src/api/_base.entity';
import { Campaign } from 'src/api/campaigns/entities/campaign.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Specification extends _BaseEntity {
  @Column({ name: 'media' })
  media: string;

  @Column({ name: 'ad_seconds', nullable: null, default: 30 })
  seconds: number;

  @Column({ name: 'ad_seconds', nullable: null, default: 30 })
  seconds_frq: number;

  @Column({ name: 'ad_banner_size', default: '640x640', nullable: true })
  banner_size: string;

  @Column({ name: 'ad_banner_size', default: '640x640', nullable: true })
  banner_frq: number;

  @Column({ name: 'logo_size', default: '112x112', nullable: true })
  logo_size: string;

  @Column({ name: 'logo_size', default: '112x112', nullable: true })
  logo_frq: number;

  @ManyToOne(() => Campaign, (campaign) => campaign.specifications)
  campaign: Campaign;
}
