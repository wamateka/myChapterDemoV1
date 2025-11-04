import express from 'express'
import { getMemberRsvpStatus, getRsvps, setMemberRsvpStatus} from '../controllers/rsvpController.js';
const router = express.Router();
// router.get('?event_id = id', getRsvps);
router.get('/status', getMemberRsvpStatus);
router.get('/event/:id', getRsvps);
router.post('/status', setMemberRsvpStatus)
// router.get('/member/id', getMemeberRsvps)
// router.get('/')

export default router;