import express from 'express';
import{getAttendances, getAttendanceById, getAttendanceByStatus, getAttendancesByEventId, getAttendancesByMemberId, addAttendanceRecord, checkinAttendanceRecord} from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/', getAttendances);
router.get('/:id', getAttendanceById);
router.get('/status/:status', getAttendanceByStatus);
router.get('/event/:eventId', getAttendancesByEventId);
router.get('/member/:memberId', getAttendancesByMemberId);
router.post('/member', addAttendanceRecord);
router.post('/checkin/:eventId', checkinAttendanceRecord);
export default router;