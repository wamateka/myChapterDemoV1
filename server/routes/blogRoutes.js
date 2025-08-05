import express from 'express';
import{getBlogPosts, getBlogPostById, addBlogPost, updateBlogPost,deleteBlogPost} from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', addBlogPost);
router.put('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);

export default router;