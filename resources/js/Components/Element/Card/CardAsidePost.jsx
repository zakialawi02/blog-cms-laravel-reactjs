import { Link } from "@inertiajs/react";
import Tag from "../Button/Tag";

const Body = ({ children }) => {
    return <div className="p-2 mx-auto">{children}</div>;
};

const ContentArticle = ({ articles }) => {
    return (
        <>
            <article>
                <div className="flex items-center gap-2 p-2">
                    <Link href="#" className="block mr-2 shrink-0">
                        <img
                            alt="post image"
                            src="#"
                            className="object-cover rounded-3xl size-14"
                            loading="lazy"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "/assets/img/image-placeholder.webp";
                            }}
                        />
                    </Link>

                    <div>
                        <h3 className="font-medium sm:text-lg line-clamp-2">
                            <Link
                                href="#"
                                className="block hover:text-frontend-primary"
                            >
                                title
                            </Link>
                        </h3>

                        <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                            <p className="hidden sm:block sm:text-xs">
                                Posted by
                                <Link
                                    href="#"
                                    className="font-medium hover:text-frontend-primary"
                                >
                                    user
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

const ContentList = ({ lists }) => {
    return (
        <>
            <ul className="flex flex-col gap-4 p-2">
                <li>
                    <Link
                        href="#"
                        className="font-bold hover:text-frontend-primary"
                    >
                        <i className="mr-2 text-xl ri-skip-right-line text-info"></i>
                        Category
                    </Link>
                </li>

                <p className="my-2 text-center font-regular">
                    No Category Available
                </p>
            </ul>
        </>
    );
};

const ContentBadge = ({ tags, icon = null }) => {
    return (
        <>
            {tags &&
                tags.map((tag, index) => (
                    <Tag key={index} tag={tag} icon={icon} />
                ))}
        </>
    );
};

const CardAsidePost = ({ children, className = "", ...props }) => {
    return (
        <div
            {...props}
            className="p-2 mb-3 border-2 rounded-lg border-frontend-neutral"
        >
            {children}
        </div>
    );
};

CardAsidePost.Body = Body;
CardAsidePost.ContentArticle = ContentArticle;
CardAsidePost.ContentList = ContentList;
CardAsidePost.ContentBadge = ContentBadge;
export default CardAsidePost;
