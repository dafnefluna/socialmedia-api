import { Router } from 'express';
import userRoutes from './usersRoutes';
//import thoughtRoutes from './thoughtsRoutes';

const router = Router();

// all of these routes are PREFIXED with '/api'
router.use('/users', userRoutes)
//router.use('/thoughts', thoughtRoutes)

export default router;