import express from 'express';
import{getGalleryImages, getGalleryImageById, getGalleryImageByMemberId, addGalleryImage,updateGalleryImage,deleteGalleryImage } from '../controllers/galleryController.js';
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({storage})

const router = express.Router();

router.get('/', getGalleryImages);
router.get('/:id', getGalleryImageById);
router.get('/member/:memberId', getGalleryImageByMemberId);
router.post('/',upload.single("imageFile"), addGalleryImage);
router.put('/:id', updateGalleryImage);
router.delete('/:id', deleteGalleryImage);
export default router;