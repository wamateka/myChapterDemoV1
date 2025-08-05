import express from 'express';
import{getPointsLog, getPointsByMemberId, addPoints, updatePoints} from '../controllers/pointsLogController.js';



const router = express.Router();

router.get('/', getPointsLog);
router.get('/member/:memberId', getPointsByMemberId);
router.post('/', addPoints);
router.put('/:id', updatePoints);
export default router;