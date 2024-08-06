import { Link } from "@inertiajs/react";

const MenuItem = (props) => {
    const { className, link = "#", children = "...", event } = props;
    return (
        <Link
            href={link}
            className={`${className} p-2 font-semibold uppercase transition-all duration-500 font-Poppins hover:text-Me-accent`}
            onClick={event}
        >
            {children}
        </Link>
    );
};

export default MenuItem;
