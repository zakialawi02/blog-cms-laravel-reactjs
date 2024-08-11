import { Link } from "@inertiajs/react";

const TagsPost = ({ tags }) => {
    console.log(tags);

    return (
        <>
            {/* tags  */}
            {tags.map((tag) => (
                <Link
                    href="#"
                    className="px-1 py-[0.1rem] transition-all duration-300 mr-1 border-[1px] rounded-2xl border-frontend-secondary hover:border-frontend-primary hover:text-frontend-primary "
                >
                    #{tag.tag_name}
                </Link>
            ))}
        </>
    );
};

export default TagsPost;
