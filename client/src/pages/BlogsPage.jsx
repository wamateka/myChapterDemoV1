import React, { useEffect } from 'react'
import { useBlogStore } from '../stores/useBlogStore'
import BlogCard from '../components/BlogCard';

function BlogsPage() {
  const {blogs, fetchBlogs} = useBlogStore();
  useEffect(()=>{
    fetchBlogs();
  }, []) 
  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">NSBE Blog</h1>
          <p className="text-lg text-base-content/70">
            Stay updated with the latest announcements, news, and insights
          </p>
        </div>

        {/* Blog Posts */}
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className="text-base-content/70">
              Blog posts and announcements will appear here once published.
            </p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {blogs.map((post) => (
              <BlogCard 
                key = {post.blog_post_id}
                id = {post.blog_post_id}
                image_url = {post.image_url	}
                title = {post.title}
                content = {post.content}
                published_at = {new Date(post.published_at).toDateString().slice(4,10)}
                avatar = {post.profile_picture}
                fist_name = {post.first_name}
                last_name = {post.last_name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogsPage
