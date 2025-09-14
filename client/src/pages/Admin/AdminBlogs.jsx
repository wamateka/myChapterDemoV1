import React, { useEffect, useState } from 'react'
import { FileText, Plus, Edit, Trash2, Eye, ArrowLeftIcon } from 'lucide-react'
import { useBlogStore } from '../../stores/useBlogStore';
import { Navigate, useNavigate, Link } from 'react-router-dom'

function AdminBlogs() {
  const { blogs, fetchBlogs, loading, deletePost } = useBlogStore();
  const [postToDelete, setPostToDelete] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetchBlogs();
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }
  return (

    <div className="min-h-screen bg-base-200 py-8">
      <button onClick={() => { navigate("/admin") }} className='btn btn-ghost mb-8'>
        <ArrowLeftIcon className='size-4 mr-2' />
        Back to admin page
      </button>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Blog Management</h1>
            <p className="text-base-content/70">Create and manage blog posts</p>
          </div>
          <Link to='/blogs/create'>
            <button className="btn btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </button>
          </Link>
        </div>

        {/* Blog Posts Table */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title mb-4">All Posts</h2>

            {blogs.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No posts created</h3>
                <p className="text-base-content/70">Create your first blog post to get started</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Published</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((post) => (
                      <tr key={post.blog_post_id}>
                        <td>
                          <div>
                            <div className="font-bold">{post.title}</div>
                            <div className="text-sm opacity-50 line-clamp-2">
                              {post.excerpt || post.content.substring(0, 100)}...
                            </div>
                          </div>
                        </td>
                        <td>{post.first_name} {post.last_name}</td>
                        <td>
                          <span className={`badge badge-success`}>
                            published
                          </span>
                        </td>
                        <td>
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString().slice(0, 10)
                            : 'Not published'
                          }
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button className="btn btn-ghost btn-sm">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="btn btn-ghost btn-sm"
                            onClick={() => {navigate(`edit/${post.blog_post_id}`)}}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="btn btn-ghost btn-sm text-error"
                              onClick={() => {
                                setPostToDelete(post);
                                document.getElementById("delete_post_modal").showModal()
                              }
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <dialog id="delete_post_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{postToDelete?.title || "none"}</h3>
          <p className="py-4">Are you sure you want to delete this event?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={() => {
                  setPostToDelete(null)
                }}
              >Cancel</button>
            </form>
            <button
              className="btn btn-error"
              onClick={async () => {
                await deletePost(postToDelete.blog_post_id)
                document.getElementById("delete_post_modal").close()
                fetchBlogs()
              }
              }

            >
              {loading ?
                <span className="loading loading-spinner loading-lg"></span> :
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete
                </>

              }
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default AdminBlogs
