import express from 'express';
import{getEvents, getEventById, addEvent, updateEvent, deleteEvent, getEventsByMember} from '../controllers/eventController.js';
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({storage})

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/',upload.single('poster_img_file'), addEvent);
router.put('/:id',upload.single('poster_img_file'), updateEvent);
router.delete('/:id', deleteEvent);
router.get('/member/:memberId', getEventsByMember);
export default router;