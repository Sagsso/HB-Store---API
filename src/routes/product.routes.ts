import { Router } from 'express';
const router = Router();

import { getProducts, createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/product.controller';


router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;