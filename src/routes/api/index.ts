import { Router } from 'express';
import { usersRoutes } from './usersRoutes';
import { thoughtsRouter } from './thoughtsRoutes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRouter);

export default router;