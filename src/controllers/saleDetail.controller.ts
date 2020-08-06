import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { SaleDetail } from '../entities/SaleDetail';

export const getSaleDetails = async (req: Request, res: Response): Promise<Response> => {
    const saleDetails = await getRepository(SaleDetail).find();
    return res.json(saleDetails);
}

export const getSaleDetail = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(SaleDetail).findOne(req.params.id);
    return res.json(results);
}

export const createSaleDetail = async (req: Request, res: Response): Promise<Response> => {
    const newSaleDetail = getRepository(SaleDetail).create(req.body);
    const results = await getRepository(SaleDetail).save(newSaleDetail);
    return res.json(results);
}

export const updateSaleDetail = async (req: Request, res: Response): Promise<Response> => {
    const saleDetail = await getRepository(SaleDetail).findOne(req.params.id);
    if (saleDetail) {
        getRepository(SaleDetail).merge(saleDetail, req.body);
        const results = await getRepository(SaleDetail).save(saleDetail);
        return res.json(results);
    }

    return res.status(404).json({ msg: 'Not SaleDetail found' });
}

export const deleteSaleDetail = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(SaleDetail).delete(req.params.id);
    return res.json(results);
}



