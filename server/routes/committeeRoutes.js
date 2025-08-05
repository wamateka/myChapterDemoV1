import express from 'express';
import{getCommitteeById, getCommittees, getCommitteesByZone, getCommitteeMembers} from '../controllers/committeeController.js';

const router = express.Router();

router.get('/', getCommittees);
router.get('/:id', getCommitteeById);
router.get('/zone/:zoneId', getCommitteesByZone);
router.get('/members/:committeeId', getCommitteeMembers);
export default router;