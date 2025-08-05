import express from 'express';
import{getGalleryImages, getGalleryImageById, getGalleryImageByMemberId, addGalleryImage,updateGalleryImage,deleteGalleryImage } from '../controllers/galleryController.js';

const router = express.Router();

router.get('/', getGalleryImages);
router.get('/:id', getGalleryImageById);
router.get('/member/:memberId', getGalleryImageByMemberId);
router.post('/', addGalleryImage);
router.put('/:id', updateGalleryImage);
router.delete('/:id', deleteGalleryImage);
export default router;