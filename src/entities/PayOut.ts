import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Credit } from "./Credit";

@Entity()
export class PayOut {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Credit)
    @JoinColumn()
    credit: Credit;

    @Column()
    payOut: number;
}