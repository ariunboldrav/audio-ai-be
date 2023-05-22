import { _BaseEntity } from 'src/api/_base.entity';
import { FileAnswer } from 'src/api/file_answers/entities/file_answer.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class FilePath extends _BaseEntity {
  @OneToOne(() => FileAnswer, (fa) => fa.paths, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  fileAnswer: FileAnswer;

  @Column({ name: 'answer', nullable: false })
  answer: string
  
  @Column({ nullable: false })
  path: string;
}
