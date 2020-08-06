import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SaleDetail } from './SaleDetail';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true})
    description: string;

    @Column()
    priceIn: number;

    @Column()
    priceOut: number;

    @Column()
    inventory: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(type => SaleDetail, saleDetail => saleDetail.product)
    saleDetails: SaleDetail[];

}