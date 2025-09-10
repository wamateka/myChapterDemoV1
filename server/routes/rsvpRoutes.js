import express from 'express'
import { getMemberRsvpStatus } from '../controllers/rsvpController.js';
const router = express.Router();
// router.get('?event_id = id', getRsvps);
router.get('/status', getMemberRsvpStatus);
// router.get('/event/id', getEventRsvps)
// router.get('/member/id', getMemeberRsvps)
// router.get('/')

export default router;