import express from 'express';
import{getMembers, getMemberById,getMemberByEmail, addMember, updateMember, deleteMember} from '../controllers/memberControler.js';;

const router = express.Router();

router.get('/', getMembers );
router.get('/:id', getMemberById);
router.get('/email/:email', getMemberByEmail);
// router.post('/', addMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);
export default router;