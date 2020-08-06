import { Router } from 'express';
const router = Router();

import {getPayOuts, getPayOut, createPayOut, updatePayOut, deletePayOut} from './../controllers/payOut.controller';

router.get('/payOuts', getPayOuts);
router.get('/payOuts/:id', getPayOut);
router.post('/payOuts', createPayOut);
router.put('/payOuts/:id', updatePayOut);
router.delete('/payOuts/:id', deletePayOut);

export default router;