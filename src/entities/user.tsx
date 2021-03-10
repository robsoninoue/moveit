import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity()
export class User {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    amountExperience: number

    @Column()
    level: number

    @CreateDateColumn()
    createdAt: Date

    constructor(){
        if(!this.id) {
            this.id = uuid()
        }
    }
}