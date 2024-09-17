import { Link } from "@inertiajs/react";

const CardPost2 = ({ title, category, link, cover, ...props }) => {
    return (
        <div className="relative overflow-hidden rounded-lg group">
            <img
                src={cover}
                alt="Post Cover"
                className="object-cover w-full h-48 transition duration-300 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/image-placeholder.webp";
                }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
                <div className="flex mb-2 space-x-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full text-frontend-accent bg-frontend-light">
                        {category}
                    </span>
                </div>
                <h3 className="text-lg font-semibold transition duration-300 text-frontend-light hover:text-frontend-accent all line-clamp-3">
                    <Link href={link}>{title}</Link>
                </h3>
            </div>
        </div>
    );
};

export default CardPost2;
