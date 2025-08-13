import React from 'react'
import {User,ThumbsUp, MessageCircle, Share} from 'lucide-react';

function BlogCard(post) {
  return (
    <div className="bg-ghost rounded-2xl shadow p-6 max-w-2xl mx-auto mb-6">
      {/* Author Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={post.avatar}
          alt="Author"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold">{post.first_name} {post.last_name}</h2>
          <p className="text-sm text-gray-500">{post.published_at}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-white whitespace-pre-wrap">{post.content}</p>
        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post visual"
            className="mt-4 rounded-lg max-h-[400px] object-cover w-full"
          />
        )}
      </div>

      {/* Reactions */}
      <div className="flex justify-between items-center text-gray-500 text-sm border-t pt-3">
        <div className="flex gap-6">
          <button className="flex items-center gap-2 hover:text-blue-600">
            <ThumbsUp className="w-4 h-4" />
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600">
            <MessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
        <span>{post.reactions || 'reactions hear'} reactions</span>
      </div>

      {/* Comment Input */}
      {/* <div className="mt-4">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring"
        />
      </div> */}
    </div>
  )
}

export default BlogCard


    // <div className="bg-ghost rounded-2xl shadow max-w-2xl mx-auto mb-6">
    //             {post.image_url && (
    //               <figure className="h-48">
    //                 <img
    //                   src={post.image_url}
    //                   alt={post.title}
    //                   className="w-full h-full object-cover"
    //                 />
    //               </figure>
    //             )}
    //             <div className="card-body">
    //               <div className="flex items-center gap-2 mb-2">
    //                 <span className="badge badge-primary">Blog</span>
    //                 <span className="text-sm text-base-content/50">
    //                   {post.published_at}
    //                 </span>
    //               </div>

    //               <h2 className="card-title text-lg">{post.title}</h2>

    //               {post.content && (
    //                 <p className="text-base-content/70 text-sm line-clamp-3">
    //                   {post.content}
    //                 </p>
    //               )}

    //               <div className="flex items-center gap-2 text-sm text-base-content/50 mt-4">
    //                 <User className="w-4 h-4" />
    //                 <span>{post.first_name} {post.last_name}</span>
    //               </div>

    //               {/* <div className="card-actions justify-end mt-4">
    //                 <Link
    //                   to={`/blog/${post.id}`}
    //                   className="btn btn-primary btn-sm"
    //                 >
    //                   Read More
    //                   <ArrowRight className="w-4 h-4" />
    //                 </Link>
    //               </div> */}
    //             </div>
    //           </div>