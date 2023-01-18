import { BaseEntity, BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity('users')

export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 255 })
    name: string

    @Column({ type: "varchar", length: 255 })
    email: string

    @Column({ type: "varchar", length: 255 })
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @BeforeInsert()
    hashpassword () {
        this.password = bcrypt.hashSync(this.password, 12)
    }

    toJSON () {
        return { ...this, password: undefined }
    }
}