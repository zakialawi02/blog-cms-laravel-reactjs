import { Link } from "@inertiajs/react";

const Tag = ({ label, index = null, icon = null }) => {
    return (
        <Link
            key={index}
            href="#"
            className="px-[0.40rem] mb-2 py-[0.15rem] transition-all duration-300 mr-1 border-[1px] rounded-2xl border-frontend-secondary hover:border-frontend-primary hover:text-frontend-primary "
        >
            {!icon ? (
                `#${label.tag_name}`
            ) : (
                <>
                    <i className={icon}></i>
                    <span> {label.tag_name}</span>
                </>
            )}
        </Link>
    );
};

export default Tag;
