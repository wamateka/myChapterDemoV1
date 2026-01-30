import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

function GallerySlideshow({ gallery, initialIndex, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const currentImage = gallery[currentIndex];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white hover:bg-white/20 p-2 rounded-lg transition"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Main content */}
            <div className="w-full h-full flex items-center justify-center px-4">
                <div className="flex items-center gap-8 max-w-6xl w-full">
                    {/* Previous button */}
                    <button
                        onClick={goToPrevious}
                        className="text-white hover:bg-white/20 p-3 rounded-lg transition flex-shrink-0"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    {/* Image container */}
                    <div className="flex-1 flex justify-center">
                        <img
                            src={currentImage.image_url}
                            alt="gallery"
                            className="max-h-[70vh] max-w-[60vw] object-contain rounded-xl"
                        />
                    </div>

                    {/* Caption on the right */}
                    <div className="w-64 flex-shrink-0 text-white bg-black/50 p-6 rounded-xl backdrop-blur-sm">
                        <h3 className="text-sm font-semibold text-gray-400 mb-4">Caption</h3>
                        <p className="text-lg leading-relaxed">
                            {currentImage.caption || 'No caption available'}
                        </p>
                        <div className="mt-6 pt-4 border-t border-white/20">
                            <p className="text-sm text-gray-400">
                                {currentIndex + 1} / {gallery.length}
                            </p>
                        </div>
                    </div>

                    {/* Next button */}
                    <button
                        onClick={goToNext}
                        className="text-white hover:bg-white/20 p-3 rounded-lg transition flex-shrink-0"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>
            </div>

            {/* Bottom progress indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {gallery.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                            index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 w-2 hover:bg-white/75'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default GallerySlideshow
