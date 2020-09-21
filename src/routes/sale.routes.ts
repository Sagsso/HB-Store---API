import { Router } from 'express';
const router = Router();

import { getSales, getSale,createSale, updateSale, deleteSale, getSalesByMonth, getAmmountByMonth, getSalesByDay, getAmmountByDay } from './../controllers/sale.controller';

router.get('/sales', getSales);
router.get('/sales/:id', getSale);
router.get('/sales/month/:month', getSalesByMonth);
router.get('/sales/day/:day/:month/:year', getSalesByDay);
router.get('/sales/ammount/month/:month', getAmmountByMonth);
router.get('/sales/ammount/day/:day/:month/:year', getAmmountByDay);
router.post('/sales', createSale);
router.put('/sales/:id', updateSale);
router.delete('/sales/:id', deleteSale);

export default router;