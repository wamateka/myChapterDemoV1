import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Loader2, ArrowLeftIcon, UserPen, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useBlogStore } from "../../stores/useBlogStore";

function EditBlog() {
    const { user } = useAuth()
    const { fetchBlog, formData, setFormData, loading, resetFormData, updateBlog, deleteBlogPost } = useBlogStore();
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const id = useParams().id;
    useEffect(() => {
        console.log(id)
        resetFormData();
        fetchBlog(id);
    }, [])
    // Handle image upload preview
    function handleChange(e) {
        const { name, type, value } = e.target
        if (type === 'file') {
            const file = e.target.files[0]
            setFormData({
                ...formData,
                image_file: file
            })
            setPreview(URL.createObjectURL(file));
            return
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    //submit update
    const handleUpdate = async (e) => {
        e.preventDefault();
        setFormData(
            {
                ...formData,
                author_member_id: user.member_id,
            }
        )
        await updateBlog(id);
        resetFormData();
        navigate(-1)
    };
    function handleDelete(e) {
        e.preventDefault();
        deleteBlogPost(id);
        resetFormData();
        navigate(-1);
    }
    return (
        <div>
            {/* Cancel confirmation dialog */}
            <div className="max-w-3xl mx-auto p-6 mt-8">
                <div className="card bg-base-100 shadow-xl p-8">
                    <button onClick={() => { navigate(-1) }} className='btn btn-ghost mb-8'>
                        <ArrowLeftIcon className='size-4 mr-2' />
                        Leave
                    </button>
                    <h1 className="text-3xl font-bold mb-6">Edit New Blog</h1>
                    <form onSubmit={handleUpdate} className="space-y-6">
                        {/* Title */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Blog Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter blog title"
                                name='title'
                                value={formData?.title}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Content */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Content</span>
                            </label>
                            <textarea
                                placeholder="Write your blog content here..."
                                name="content"
                                value={formData?.content}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full min-h-[150px]"
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Upload Image (Optional)</span>
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="btn btn-primary flex items-center gap-2 cursor-pointer">
                                    <Upload size={18} />
                                    Choose Image
                                    <input
                                        type="file"
                                        name="image_file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleChange}
                                    />
                                </label>
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-16 h-16 object-cover rounded-lg border"
                                    />
                                )}
                            </div>
                        </div>
                        {/* Submit and Cancel Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="btn btn-success flex-1"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="animate-spin" size={18} />
                                        Updating...
                                    </span>
                                ) : (
                                    "Update Blog"
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => {document.getElementById("delete_post_modal").showModal()}}
                                className="btn btn-error flex-1"
                            >
                                <Trash2 size={18} />
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <dialog id="delete_post_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{formData?.title || "none"}</h3>
                    <p className="py-4">Are you sure you want to delete this event?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn"
                            >Cancel</button>
                        </form>
                        <button
                            className="btn btn-error"
                            onClick={handleDelete}

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
    );
}
export default EditBlog;