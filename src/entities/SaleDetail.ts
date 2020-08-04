import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { Sale } from './Sale';

@Entity()
export class SaleDetail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    saleId: number;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @ManyToOne(type => Sale, sale => sale.saleDetails)
    sale: Sale;

    @ManyToOne(type => Product, product => product.saleDetails)
    product: Product;



}