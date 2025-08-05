import express from 'express';
import{getEvents, getEventById, addEvent, updateEvent, deleteEvent, getEventsByMember} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', addEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.get('/member/:memberId', getEventsByMember);
export default router;