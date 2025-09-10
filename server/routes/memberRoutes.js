import express from 'express';
import{getMembers, getMemberById,getMemberByEmail, addMember, updateMember, deleteMember, getLeaderboard, getProfile, updateProfilePicture, getMemberStats} from '../controllers/memberControler.js';;
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({storage})

const router = express.Router();

router.get('/', getMembers );
router.get('/:id', getMemberById);
router.get('/profile/:id', getProfile);
router.get('/email/:email', getMemberByEmail);
router.get('/stats/:id', getMemberStats)
router.get('/leaderboard/leaderboard', getLeaderboard)
// router.post('/', addMember);
router.put('/:id', updateMember);
router.put('/image/:id', upload.single("imageFile"),updateProfilePicture);
router.delete('/:id', deleteMember);
export default router;