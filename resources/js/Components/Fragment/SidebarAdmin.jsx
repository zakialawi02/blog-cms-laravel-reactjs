import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import NavMenu from "../Element/Sidebar/NavMenu";
import NavItem from "../Element/Sidebar/NavItem";

const SidebarAdmin = ({ show, toggleSidebar }) => {
    const { auth } = usePage().props;

    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleNavMenuClick = (menu) => {
        setSelectedMenu((prevMenu) => (prevMenu === menu ? null : menu));
    };

    return (
        <>
            <div
                className={`fixed left-0 top-0 w-64 h-full bg-backend-dark p-4 z-50 sidebar-menu transition-transform ${
                    show ? "" : "-translate-x-full"
                }`}
            >
                <Link
                    preserveState
                    href="/"
                    className="flex items-center pb-4 border-b border-b-backend-muted"
                >
                    <img
                        src="/logo/logo.webp"
                        alt="Logo"
                        className="object-cover w-8 h-8 rounded"
                    />

                    <span className="ml-3 text-lg font-bold text-backend-base-100">
                        Dashboard
                    </span>
                </Link>
                <div
                    id="sidebar-menu-container"
                    className="mt-4 overflow-y-auto h-[calc(100vh-6rem)] -mr-2"
                >
                    <ul className="mt-2">
                        <NavMenu
                            icon="ri-dashboard-line"
                            text="Dashboard"
                            to="/dashboard"
                        />

                        {(auth.user.role === "admin" ||
                            auth.user.role === "writer") && (
                            <NavMenu
                                icon="ri-file-text-line"
                                text="Posts"
                                to="/dashboard/posts"
                            />
                        )}

                        {auth.user.role === "admin" && (
                            <>
                                <NavMenu
                                    icon="ri-folder-reduce-line"
                                    text="Categories"
                                    to="/dashboard/categories"
                                />

                                <NavMenu
                                    icon="ri-price-tag-3-line"
                                    text="Tags"
                                    to="/dashboard/tags"
                                />

                                <NavMenu
                                    icon="ri-pages-line"
                                    text="Pages"
                                    to="/dashboard/pages"
                                />
                            </>
                        )}

                        <NavMenu
                            icon="ri-message-2-line"
                            text="My Comments"
                            to="/dashboard/my-comments"
                        />

                        {(auth.user.role === "admin" ||
                            auth.user.role === "writer") && (
                            <>
                                <NavMenu
                                    icon="ri-discuss-line"
                                    text="Comments"
                                    to="/dashboard/comments"
                                />

                                <NavMenu
                                    icon="ri-bar-chart-box-line"
                                    text="Statistics View"
                                    selected={
                                        selectedMenu === "Statistics View"
                                    }
                                    onClick={() =>
                                        handleNavMenuClick("Statistics View")
                                    }
                                >
                                    <NavItem to="/dashboard/stats/posts">
                                        Articles View
                                    </NavItem>
                                    <NavItem to="/dashboard/stats/posts/location">
                                        By Country
                                    </NavItem>
                                </NavMenu>
                            </>
                        )}

                        {auth.user.role === "admin" && (
                            <>
                                <NavMenu
                                    icon="ri-bookmark-line"
                                    text="Empty Page"
                                    to="/dashboard/empty"
                                />
                            </>
                        )}

                        <div className="p-1 mt-1 mb-2 text-base font-semibold text-gray-500">
                            <p>Manage</p>
                        </div>

                        <NavMenu
                            icon="ri-notification-badge-line"
                            text="Notifications"
                            to="/dashboard/notifications"
                        />

                        {auth.user.role === "admin" && (
                            <>
                                <NavMenu
                                    icon="ri-folder-user-line"
                                    text="Users"
                                    to="/dashboard/users"
                                />

                                <NavMenu
                                    icon="ri-menu-2-line"
                                    text="Menus Item"
                                    to="/dashboard/menus-item"
                                />

                                <NavMenu
                                    icon="ri-news-line"
                                    text="Newsletter"
                                    to="/dashboard/newsletter"
                                />

                                <NavMenu
                                    icon="ri-settings-2-line"
                                    text="Settings"
                                    to="/dashboard/web/settings"
                                />
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div
                className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay ${
                    show ? "" : "hidden"
                }`}
                onClick={toggleSidebar}
            />
        </>
    );
};

export default SidebarAdmin;
