import express from 'express';
import{getBlogPosts, getBlogPostById, addBlogPost, updateBlogPost,deleteBlogPost} from '../controllers/blogController.js';
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({storage});

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', upload.single('image_file'), addBlogPost);
router.put('/:id', upload.single('image_file'), updateBlogPost);
router.delete('/:id', deleteBlogPost);

export default router;