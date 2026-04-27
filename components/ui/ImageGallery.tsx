import Image from 'next/image'

interface Props {
    images: { src: string; alt: string }[]
    onImageClick: (index: number) => void // Changed to index
}

export default function ImageGallery({ images, onImageClick }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, index) => (
                <div
                    key={index}
                    onClick={() => onImageClick(index)} // Pass the index
                    className="relative group aspect-square rounded-[2rem] overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm shadow-lg cursor-pointer"
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">View Full Size</span>
                    </div>
                </div>
            ))}
        </div>
    )
}