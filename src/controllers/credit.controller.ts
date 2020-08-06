import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Credit } from '../entities/Credit';

export const getCredits = async (req: Request, res: Response): Promise<Response> => {
    const credits = await getRepository(Credit).find({ relations: ["sale", "payouts"] });
    return res.json(credits);
}

export const getCredit = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Credit).findOne(req.params.id);
    return res.json(results);
}

export const createCredit = async (req: Request, res: Response): Promise<Response> => {
    const newCredit = getRepository(Credit).create(req.body);
    const results = await getRepository(Credit).save(newCredit);
    return res.json(results);
}

export const updateCredit = async (req: Request, res: Response): Promise<Response> => {
    const credit = await getRepository(Credit).findOne(req.params.id);
    if (credit) {
        getRepository(Credit).merge(credit, req.body);
        const results = await getRepository(Credit).save(credit);
        return res.json(results);
    }

    return res.status(404).json({ msg: 'Not Credit found' });
}

export const deleteCredit = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Credit).delete(req.params.id);
    return res.json(results);
}