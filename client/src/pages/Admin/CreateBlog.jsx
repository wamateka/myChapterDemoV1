import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Loader2,ArrowLeftIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useBlogStore } from "../../stores/useBlogStore";

function CreateBlog() {
    const { user } = useAuth()
    const { postBlog, formData, setFormData, loading, resetFormData } = useBlogStore();
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);

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

    // Temporary mock submit for testing
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData(
            {
                ...formData,
                author_member_id: user.member_id,
            }
        )
        await postBlog();
        resetFormData();
        navigate(-1)
    };

    return (
        <div>
            {/* Cancel confirmation dialog */}
            <div className="max-w-3xl mx-auto p-6 mt-8">
                <div className="card bg-base-100 shadow-xl p-8">
                    <button onClick={() => { navigate(-1) }} className='btn btn-ghost mb-8'>
                        <ArrowLeftIcon className='size-4 mr-2' />
                        Leave
                    </button>
                    <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                        Creating...
                                    </span>
                                ) : (
                                    "Create Blog"
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => {resetFormData();navigate(-1)} }
                                className="btn btn-error flex-1"
                            >   
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CreateBlog;