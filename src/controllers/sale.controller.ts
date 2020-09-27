import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Sale } from '../entities/Sale';
import { SaleDetail } from '../entities/SaleDetail';
import { Product } from '../entities/Product';
import { Credit } from '../entities/Credit';

export const getSales = async (req: Request, res: Response): Promise<Response> => {
    const sales = await getRepository(Sale).find();
    return res.json(sales);
}

export const getSale = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Sale).findOne(req.params.id);
    return res.json(results);
}

export const getSalesByMonth = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await getRepository(Sale)
            .createQueryBuilder("sale")
            .where("Month(saleDate) = :month", { month: +req.params.month })
            .getMany();
            return res.json(result);
        
    } catch (error) {
        console.log(error);
        
        return res.json({error: true, msg: error})
    }
}
export const getSalesByDay = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await getRepository(Sale)
            .createQueryBuilder("sale")
            .where("Month(saleDate) = :month AND Day(saleDate) = :day AND Year(saleDate) = :year",
            { month: +req.params.month, day: +req.params.day, year: +req.params.year })
            .getMany();
            return res.json(result);
        
    } catch (error) {
        console.log(error);
        
        return res.json({error: true, msg: error})
    }
}
export const getAmmountByDay = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await getRepository(Sale)
            .createQueryBuilder("sale")
            .select("SUM(price)", "sum")
            .where("Month(saleDate) = :month AND Day(saleDate) = :day AND Year(saleDate) = :year",
            { month: +req.params.month, day: +req.params.day, year: +req.params.year })
            .getRawOne();
            return res.json(result);
        
    } catch (error) {
        console.log(error);
        
        return res.json({error: true, msg: error})
    }
}

export const getAmmountByMonth = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await getRepository(Sale)
            .createQueryBuilder("sale")
            .select("SUM(price)", "sum")
            .where("Month(saleDate) = :month", { month: +req.params.month  })
            .getRawOne();
            return res.json(result);
        
    } catch (error) {
        console.log(error);
        
        return res.json({error: true, msg: error})
    }
}

export const createSale = async (req: Request, res: Response) => {
    
    const newSale = new Sale();

    newSale.price = req.body.price;
    newSale.pay = req.body.pay;
    newSale.client = req.body.client;
    try {
        if (newSale) {
            await getRepository(Sale).save(newSale)
                .then(async newSale => {
                   
                    req.body.products.forEach(async (product: { id: any; quantity: any; }) => {

                        const dbProduct = await getRepository(Product).findOne(product.id);

                        let newSaleDetail = new SaleDetail();

                        if(dbProduct){
                            newSaleDetail.quantity = product.quantity;
                            newSaleDetail.price = dbProduct.priceOut;
                            newSaleDetail.sale = newSale;
                            newSaleDetail.product = dbProduct;
                            dbProduct.inventory -= product.quantity;
                            await getRepository(SaleDetail).save(newSaleDetail);
                            await getRepository(Product).save(dbProduct);
                        }

                    });
                    if(newSale.pay < newSale.price) {
                        const newCredit = new Credit();
                        newCredit.ammount = newSale.price - newSale.pay;
                        newCredit.sale = newSale;
                        await getRepository(Credit).save(newCredit);

                    }
                    return res.json(newSale);
                })
                .catch(error => {
                    return res.status(500).json({
                        msg: 'Failed',
                        error: error
                    });
                });
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Failed',
            error: error
        });
    }



}

export const updateSale = async (req: Request, res: Response): Promise<Response> => {
    const sale = await getRepository(Sale).findOne(req.params.id);
    if (sale) {
        getRepository(Sale).merge(sale, req.body);
        const results = await getRepository(Sale).save(sale);
        return res.json(results);
    }

    return res.status(404).json({ msg: 'Not Sale found' });
}

export const deleteSale = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Sale).delete(req.params.id);
    return res.json(results);
}
