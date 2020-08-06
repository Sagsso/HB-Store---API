import { Router } from 'express';
const router = Router();

import {getCredit, getCredits, createCredit, updateCredit, deleteCredit} from './../controllers/credit.controller';

router.get('/credits', getCredits);
router.get('/credits/:id', getCredit);
router.post('/credits', createCredit);
router.put('/credits/:id', updateCredit);
router.delete('/credits/:id', deleteCredit);

export default router;