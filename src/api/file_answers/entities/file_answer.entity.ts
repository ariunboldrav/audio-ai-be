import { _BaseEntity } from 'src/api/_base.entity';
import { Campaign } from 'src/api/campaign/entities/campaign.entity';
import { FilePath } from 'src/api/file_paths/entities/file_path.entity';
import { FileType } from 'src/api/file_types/entities/file_type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class FileAnswer extends _BaseEntity {
  @Column({ name: 'answer_one', nullable: true })
  answer_one: string;

  @Column({ name: 'answer_two', nullable: true })
  answer_two: string;

  @Column({ name: 'answer_three', nullable: true })
  answer_three: string;

  @Column({ name: 'answer_four', nullable: true })
  answer_four: string;

  @OneToOne(() => Campaign, (campaign) => campaign.spec, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @OneToMany(() => FilePath, (fp) => fp.fileAnswer)
  paths: FilePath[];
}
