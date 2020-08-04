import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SaleDetail } from './SaleDetail';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    priceIn: number;

    @Column()
    priceOut: number;

    @Column()
    inventory: number;

    @Column('datetime')
    createdAt: Date;

    @OneToMany(type => SaleDetail, saleDetail => saleDetail.product)
    saleDetails: SaleDetail[];

}