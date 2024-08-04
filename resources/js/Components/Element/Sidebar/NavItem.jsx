import { Link, usePage } from "@inertiajs/react";

const NavItem = ({ to = "#", children }) => {
    const { url } = usePage();
    const isActive = url === to;

    return (
        <li
            className={` mb-1 py-2 px-1 rounded-lg group ${
                isActive ? "active" : ""
            }`}
        >
            <Link
                href={to}
                className={`text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 group-[.active]:text-gray-500`}
            >
                {children}
            </Link>
        </li>
    );
};

export default NavItem;
