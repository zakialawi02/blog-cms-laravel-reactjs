import { Link } from "@inertiajs/react";

const MenuBody = ({ children }) => {
    return <div className="space-y-1 text-frontend-dark">{children}</div>;
};

const MenuItem = ({ url = "#", children }) => {
    return (
        <div>
            <Link
                href={url}
                className="text-lg transition-all duration-300 hover:text-frontend-primary"
            >
                {children}
            </Link>
        </div>
    );
};

const FooterMenu = ({ children }) => {
    return <div className="flex flex-col gap-5">{children}</div>;
};

FooterMenu.MenuBody = MenuBody;
FooterMenu.MenuItem = MenuItem;
export default FooterMenu;
