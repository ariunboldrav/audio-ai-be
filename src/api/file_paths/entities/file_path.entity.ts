import { _BaseEntity } from 'src/api/_base.entity';
import { FileAnswer } from 'src/api/file_answers/entities/file_answer.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class FilePath extends _BaseEntity {
  @ManyToOne(() => FileAnswer, (fa) => fa.answer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'file_answer_id' })
  fileAnswers: FileAnswer;

  @Column({ nullable: false })
  path: string;
}
