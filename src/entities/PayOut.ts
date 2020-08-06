import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Credit } from "./Credit";

@Entity()
export class PayOut {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Credit, credit => credit.payouts)
    credit: Credit;

    @Column()
    payOut: number;
}