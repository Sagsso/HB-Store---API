import { Router } from 'express';
const router = Router();

import { getSales, getSale,createSale, updateSale, deleteSale } from './../controllers/sale.controller';

router.get('/sales', getSales);
router.get('/sales/:id', getSale);
router.post('/sales', createSale);
router.put('/sales/:id', updateSale);
router.delete('/sales/:id', deleteSale);

export default router;