import { sql } from '../db/dbConnection.js';

export const getBlogPosts = async (req, res) => {
    try {
        const posts = await sql`
            SELECT * FROM BlogPosts
            JOIN members ON members.member_id = BlogPosts.author_member_id
            ORDER BY BlogPosts.published_at DESC;
        `;
        res.status(200).json({ message: 'success', data: posts });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}
export const getBlogPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await sql`
            SELECT * FROM BlogPosts WHERE blog_post_id = ${id};`;
        if (results.length === 0) {
            return res.status(404).json({ message: 'Blog post not found' });
        } else {
            res.status(200).json({ message: 'success', data: results[0] });
        }
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}
export const getBlogPostsByAuthor = async (req, res) => {
    const { authorId } = req.params;
    try {
        const results = await sql`
            SELECT * FROM BlogPosts WHERE author_member_id = ${authorId} ORDER BY published_at DESC;`;
        if (results.length === 0) {
            return res.status(404).json({ message: 'No blog posts found for this author' });
        } else {
            res.status(200).json({ message: 'success', data: results });
        }
    } catch (error) {
        console.error('Error fetching blog posts by author:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}
export const addBlogPost = async (req, res) => {
    const { author_member_id, title, content, image_url } = req.body;
    try {
        const newPost = await sql`
            INSERT INTO BlogPosts (author_member_id, title, content, image_url)
            VALUES (${author_member_id}, ${title}, ${content}, ${image_url})
            RETURNING *;`;
        res.status(201).json({ message: 'success', data: newPost[0] });
    } catch (error) {
        console.error('Error adding blog post:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}

export const updateBlogPost = async (req, res) => {
    const { id } = req.params;
    const { author_member_id, title, content, image_url } = req.body;
    try {
        const updatedPost = await sql`
            UPDATE BlogPosts
            SET author_member_id = ${author_member_id}, title = ${title}, content = ${content}, image_url = ${image_url}
            WHERE blog_post_id = ${id}
            RETURNING *;`;
        if (updatedPost.length === 0) {
            return res.status(404).json({ message: 'Blog post not found' });
        } else {
            res.status(200).json({ message: 'success', data: updatedPost[0] });
        }
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}

export const deleteBlogPost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await sql`
            DELETE FROM BlogPosts WHERE blog_post_id = ${id} RETURNING *;`;
        if (deletedPost.length === 0) {
            return res.status(404).json({ message: 'Blog post not found' });
        } else {
            res.status(200).json({ message: 'success', data: deletedPost[0] });
        }
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}
