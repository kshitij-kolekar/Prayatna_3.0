/**
 * routes/requestRoutes.js
 */
import { Router } from 'express';
import { createRequest, getRequests, updateRequestStatus } from '../controllers/requestController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// Require login for all request operations
router.use(verifyToken);

router.post('/', createRequest);
router.get('/', getRequests);
router.put('/:id/status', updateRequestStatus);

export default router;
