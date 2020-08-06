import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Sale } from '../entities/Sale';

export const getSales = async (req: Request, res: Response): Promise<Response> => {
    const sales = await getRepository(Sale).find();
    return res.json(sales);
}

export const getSale = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Sale).findOne(req.params.id);
    return res.json(results);
}

export const createSale = async (req: Request, res: Response): Promise<Response> => {
    const newSale = getRepository(Sale).create(req.body);
    const results = await getRepository(Sale).save(newSale);
    return res.json(results);
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
