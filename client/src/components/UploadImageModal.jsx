import { Camera, CircleX, File, PlusCircleIcon, Text } from 'lucide-react'
import React, { useState } from 'react'
import { useGalleryStore } from '../stores/useGalleryStore'
import { useAuth } from '../context/AuthContext';

function UploadImageModal() {
    const { user } = useAuth();
    const { formData, setFormData, uploadImage, uploading,resetFormData,fetchGallery } = useGalleryStore();
    const [preview, setPreview] = useState(null);

    function handleFileChange(e) {
        const file = e.target.files[0]
        if (file) {
            setFormData(({ ...formData, imageFile: file}))
            setPreview(URL.createObjectURL(file));
            console.log(preview)
        }

    }
    function handleSubmit(e){
        e.preventDefault();
        // console.log(formData);
        setFormData({...formData, memberId: user.member_id})        
        uploadImage();
        setPreview(null)
        document.getElementById('fileUpload').value = "";
        resetFormData();      
    }

    return (
        <dialog id="upload_img" className='modal'>
            <div className='modal-box'>
                <form method='dialog'>
                    <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'><CircleX /></button>
                </form>
                <h3 className='font-bold text-xl mb-8'>upload a new Image</h3>
                <form onSubmit={(e) => {handleSubmit(e)}} className='gap-6'>
                    {/* file section*/}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Image file</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <File className="size-5" />
                            </div>
                            <input
                                type='file'
                                id = 'fileUpload'
                                name = 'imageFile'
                                accept="image/*"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                // value={formData.imageFilePath}
                                onChange={(e) => handleFileChange(e)}
                            />
                        </div>
                    </div>
                    {preview && (
                        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100 pt-5">
                            <img src={preview} alt='preview'
                                className='size-full object-contain'
                            />
                        </div>

                    )}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Caption</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <Text className="size-5" />
                            </div>
                            <input
                                type='text'
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={formData.caption}
                                onChange={(e) => setFormData({ ...formData, caption: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* modal actions */}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost">Cancel</button>
                        </form>
                        <button
                            type="submit"
                            className="btn btn-primary min-w-[120px]"
                            disabled={!formData.imageFile || !formData.caption}
                        >
                            {uploading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                <>
                                    <PlusCircleIcon className="size-5 mr-2" />
                                    Upload image
                                </>
                            )}
                        </button>
                    </div>



                </form>



            </div>

        </dialog>
    )
}

export default UploadImageModal
