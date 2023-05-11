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
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class FileAnswer extends _BaseEntity {
  @ManyToOne(() => Campaign, (c) => c.fileAnswers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @ManyToOne(() => FileType, (ft) => ft.fileAnswers)
  @JoinColumn({ name: 'file_type_id' })
  fType: FileType;

  @Column({})
  answer: string;

  @OneToMany(() => FilePath, (fp) => fp.fileAnswers)
  paths: FilePath[];
}
