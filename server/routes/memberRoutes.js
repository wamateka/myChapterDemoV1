import express from 'express';
import{getMembers, getMemberById,getMemberByEmail, addMember, updateMember, deleteMember, getLeaderboard} from '../controllers/memberControler.js';;

const router = express.Router();

router.get('/', getMembers );
router.get('/:id', getMemberById);
router.get('/email/:email', getMemberByEmail);
router.get('/leaderboard/leaderboard', getLeaderboard)
// router.post('/', addMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);
export default router;