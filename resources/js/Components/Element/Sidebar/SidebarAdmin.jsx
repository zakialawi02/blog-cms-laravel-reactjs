import React, { useState } from "react";
import NavItem from "./NavItem";
import NavMenu from "./NavMenu";
import { Link } from "@inertiajs/react";

const SidebarAdmin = ({ show, toggleSidebar }) => {
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
                    href="/"
                    className="flex items-center pb-4 border-b border-b-backend-muted"
                >
                    <img
                        src="https://placehold.co/32x32"
                        alt="Logo"
                        className="object-cover w-8 h-8 rounded"
                    />
                    <span className="ml-3 text-lg font-bold text-backend-base-100">
                        Logo
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

                        <NavMenu
                            icon="ri-file-text-line"
                            text="Posts"
                            to="/dashboard/posts"
                        />

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
                            icon="ri-bar-chart-box-line"
                            text="Statistics View"
                            selected={selectedMenu === "Statistics View"}
                            onClick={() =>
                                handleNavMenuClick("Statistics View")
                            }
                        >
                            <NavItem to="/dashboard/posts/stats">
                                Articles View
                            </NavItem>
                            <NavItem to="/dashboard/posts/stats/location">
                                By Country
                            </NavItem>
                        </NavMenu>

                        <NavMenu
                            icon="ri-bar-chart-box-line"
                            text="Temp"
                            selected={selectedMenu === "Temp"}
                            onClick={() => handleNavMenuClick("Temp")}
                        >
                            <NavItem to="/dashboard">All orders</NavItem>
                            <NavItem to="#">Pending order</NavItem>
                            <NavItem to="#">Completed order</NavItem>
                        </NavMenu>

                        <NavMenu
                            icon="ri-bookmark-line"
                            text="Empty Page"
                            to="/dashboard/empty"
                        />

                        <NavMenu
                            icon="ri-settings-2-line"
                            text="Settings"
                            to="#"
                        />
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
