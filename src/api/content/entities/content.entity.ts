import { _BaseEntity } from "src/api/_base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Content extends _BaseEntity {

    @Column({type: 'text'})
    goal: string

    @Column({type: 'text'})
    hope: string

    @Column({type: 'text'})
    target_audience: string

    @Column({type: 'text'})
    style_adv: string

    @Column({type: 'text'})
    audience_feel: string

    @Column({type: 'text'})
    character_or_tone: string

    @Column({type: 'text'})
    features: string

    @Column({type: 'text'})
    key_messages: string

    @Column({type: 'text'})
    guideline_tone: string

    @Column({type: 'text'})
    comments: string
}
