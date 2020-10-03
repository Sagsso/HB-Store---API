import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';

export const getProducts = async (req: Request, res: Response): Promise<Response> => {
    const products = await getRepository(Product).find();
    return res.json(products);
}

export const getProduct = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Product).findOne(req.params.id);
    return res.json(results);
}

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    const newProduct = getRepository(Product).create(req.body);
    const results = await getRepository(Product).save(newProduct);
    return res.json(results);
}

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const product = await getRepository(Product).findOne(req.params.id);
    if (product) {
        getRepository(Product).merge(product, req.body);
        const results = await getRepository(Product).save(product);
        return res.json(results);
    }

    return res.status(404).json({ msg: 'Not product found' });
}

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const product = await getRepository(Product).findOne(req.params.id, { relations: ["saleDetails"]});
        if(product?.saleDetails.length) {
            return res.json({msg: 'No es posible eliminar el producto porque registra ventas.',
                error: false, deleted: false});
        }
        const deleted = await getRepository(Product).delete(req.params.id);
        return res.json({ msg: deleted, error: false, deleted: true});
    } catch (error) {
        return res.json({ msg: error, error: true, deleted: false});

    }
}

