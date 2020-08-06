import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './Product';
import { SaleDetail } from './SaleDetail';

@Entity()
export class Sale {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    saleDate: Date;

    @Column()
    price: number;

    @Column()
    pay: number;

    @Column()
    client: string;

    @OneToMany(type => SaleDetail, saleDetail => saleDetail.sale)
    saleDetails: SaleDetail[];
    
}