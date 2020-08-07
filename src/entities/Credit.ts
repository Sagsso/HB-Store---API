import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Sale } from "./Sale";
import { PayOut } from "./PayOut";

@Entity()
export class Credit {
    
    @PrimaryGeneratedColumn()       
    id: number;

    @OneToOne(type => Sale, { nullable: false })
    @JoinColumn()
    sale: Sale;

    @Column()
    ammount: number;

    @Column({default: true})
    isActive: boolean;

    @OneToMany(type => PayOut, payout => payout.credit)
    payouts: PayOut[];

}