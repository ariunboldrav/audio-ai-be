import { _BaseEntity } from 'src/api/_base.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TokenTypeEnum } from '../../../common/enum/token.type.enum';
import { TokenSendTypeEnum } from '../../../common/enum/token.sendtype.enum';

@Entity()
export class Token extends _BaseEntity {
  @Column()
  public user_id: number;

  @Column({ type: 'varchar', length: 100 })
  public send_to!: string;

  @Column({ type: 'enum', enum: TokenSendTypeEnum })
  public send_type: TokenSendTypeEnum;

  @Column({ type: 'enum', enum: TokenTypeEnum })
  public type: TokenTypeEnum;

  @Column({ type: 'varchar', length: 6 })
  public token: string

  @Column({ type: 'varchar', nullable: true })
  public hash: string
}
