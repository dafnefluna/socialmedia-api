import { Router } from 'express';
const router = Router();
import { userRouter } from './usersRoutes';
import { thoughtsRouter } from './thoughtsRoutes';

router.use('/users', userRouter);
router.use('/thoughts', thoughtsRouter);

export default router;