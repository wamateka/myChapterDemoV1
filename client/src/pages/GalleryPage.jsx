import React, { useEffect } from 'react'
import { useGalleryStore } from '../stores/useGalleryStore'

function GalleryPage() {
    const { fetchGallery, gallery, loading } = useGalleryStore();
    useEffect(() => {
        fetchGallery();
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary mb-4">NSBE Gallery</h1>
                    <p className="text-lg text-base-content/70">
                        Browse photos from our events and activities
                    </p>
                </div>
                <div className="p-6 max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Gallery</h1>
                    <div className="flex flex-wrap gap-4 items-end">
                        {gallery.map((image) => (
                            <div key={image.gallery_image_id} className="flex-shrink-0">
                                <img
                                    src={image.image_url}
                                    alt="image"
                                    className="h-60 w-auto rounded-xl transition-transform duration-300 hover:scale-105 object-cover"
                                    style={{ display: 'block' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default GalleryPage
