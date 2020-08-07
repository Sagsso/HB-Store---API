import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PayOut } from '../entities/PayOut';
import { Credit } from '../entities/Credit';

export const getPayOuts = async (req: Request, res: Response): Promise<Response> => {
    const payOuts = await getRepository(PayOut).find({ relations: ["credit"] });
    return res.json(payOuts);
}

export const getPayOut = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(PayOut).findOne(req.params.id);
    return res.json(results);
}

export const createPayOut = async (req: Request, res: Response): Promise<Response> => {

    //Create PayOut
    const newPayOut = new PayOut();
    newPayOut.credit = req.body.credit;
    newPayOut.payOut = req.body.payOut;
    const results = await getRepository(PayOut).save(newPayOut);

    //Disccount PayOut from credit
    const credit = await getRepository(Credit).findOne(req.body.credit);
    if(credit) {
        credit.ammount -= newPayOut.payOut;
        credit.ammount == 0 ? credit.isActive = false : credit.isActive = true;
        await getRepository(Credit).save(credit);
    }

    return res.json(results);
    
}

export const updatePayOut = async (req: Request, res: Response): Promise<Response> => {
    const payOut = await getRepository(PayOut).findOne(req.params.id);
    if (payOut) {
        getRepository(PayOut).merge(payOut, req.body);
        const results = await getRepository(PayOut).save(payOut);
        return res.json(results);
    }

    return res.status(404).json({ msg: 'Not PayOut found' });
}

export const deletePayOut = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(PayOut).delete(req.params.id);
    return res.json(results);
}