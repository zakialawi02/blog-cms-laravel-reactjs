import { Link } from "@inertiajs/react";

const NotificationItem = ({
    icon = "",
    to = "#",
    titleText = "",
    childrenText = "",
    children,
}) => {
    return (
        <li>
            <Link
                href={to}
                className="py-2 px-4 flex items-center hover:bg-gray-50 group"
            >
                <img
                    src={icon}
                    alt="avatar"
                    className="w-8 h-8 rounded block object-cover align-middle"
                />
                <div className="ml-2">
                    <div className="text-[13px] text-backend-muted font-medium truncate group-hover:text-backend-primary">
                        {titleText}
                    </div>
                    <div className="text-[11px] text-gray-400">
                        {childrenText}
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default NotificationItem;
