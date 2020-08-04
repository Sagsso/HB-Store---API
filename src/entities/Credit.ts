import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Sale } from "./Sale";

@Entity()
export class Credit {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Sale)
    @JoinColumn()
    sale: Sale;

    @Column()
    ammount: number;

    @Column()
    isActive: boolean;

}