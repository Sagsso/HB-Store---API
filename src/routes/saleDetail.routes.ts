import { Router } from 'express';
const router = Router();

import { getSaleDetails, getSaleDetail, createSaleDetail, updateSaleDetail, deleteSaleDetail } from './../controllers/saleDetail.controller';

router.get('/saleDetails', getSaleDetails);
router.get('/saleDetails/:id', getSaleDetail);
router.post('/saleDetails', createSaleDetail);
router.put('/saleDetails/:id', updateSaleDetail);
router.delete('/saleDetails/:id', deleteSaleDetail);

export default router;