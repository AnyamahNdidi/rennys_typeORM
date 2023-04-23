import { Entity, Column, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import "reflect-metadata";
import * as bcrypt from 'bcrypt';

@Entity()

export class user extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
    }

    async checkPassword(plainTextPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, this.password);
  }

    @Column({ nullable: true })
    token: string;

    @Column({ default: false })
    verified: boolean;
}