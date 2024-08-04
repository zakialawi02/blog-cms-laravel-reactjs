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
                className={`fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform ${
                    show ? "" : "-translate-x-full"
                }`}
            >
                <Link
                    href="/dashboard"
                    className="flex items-center pb-4 border-b border-b-gray-800"
                >
                    <img
                        src="https://placehold.co/32x32"
                        alt="Logo"
                        className="object-cover w-8 h-8 rounded"
                    />
                    <span className="ml-3 text-lg font-bold text-white">
                        Logo
                    </span>
                </Link>
                <div
                    id="sidebar-menu-container"
                    className="mt-4 overflow-y-auto h-[calc(100vh-6rem)] -mr-2"
                >
                    <ul className="mt-2">
                        <NavMenu
                            icon="ri-home-2-line"
                            text="Dashboard"
                            to="/dashboard"
                        />

                        <NavMenu
                            icon="ri-instance-line"
                            text="Orders"
                            selected={selectedMenu === "Orders"}
                            onClick={() => handleNavMenuClick("Orders")}
                        >
                            <NavItem to="/dashboard">All orders</NavItem>
                            <NavItem to="#">Pending order</NavItem>
                            <NavItem to="#">Completed order</NavItem>
                        </NavMenu>

                        <NavMenu
                            icon="ri-shopping-bag-3-line"
                            text="Products"
                            selected={selectedMenu === "Products"}
                            onClick={() => handleNavMenuClick("Products")}
                        >
                            <NavItem to="#">All products</NavItem>
                            <NavItem to="/empty">Pending product</NavItem>
                            <NavItem to="#">Completed product</NavItem>
                        </NavMenu>

                        <NavMenu
                            icon="ri-bookmark-line"
                            text="Empty Page"
                            to="/empty"
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
