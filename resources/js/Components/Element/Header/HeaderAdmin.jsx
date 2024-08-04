import { useState, useEffect, useRef } from "react";
import DropdownItem from "../Dropdown/DropdownItem";
import DropdownMenu from "../Dropdown/DropdownMenu";
import Search from "../Search/Search";
import Notification from "../Notification/Notification";
import { Link, usePage } from "@inertiajs/react";

const HeaderAdmin = ({ user, toggleSidebar }) => {
    const { url } = usePage();
    const pageNow = url
        .split("/")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");

    const [isOpenDropdownUser, setIsOpenDropdownUser] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpenNotification, setIsOpenNotification] = useState(false);

    const dropdownUserRef = useRef(null);
    const searchRef = useRef(null);
    const notificationRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            dropdownUserRef.current &&
            !dropdownUserRef.current.contains(event.target)
        ) {
            setIsOpenDropdownUser(false);
        }
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsOpenSearch(false);
        }
        if (
            notificationRef.current &&
            !notificationRef.current.contains(event.target)
        ) {
            setIsOpenNotification(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="sticky top-0 left-0 z-30 flex items-center px-6 py-2 bg-white shadow-md shadow-black/5">
            <button
                type="button"
                className="text-lg text-gray-600 sidebar-toggle"
                onClick={() => toggleSidebar()}
            >
                <i className="ri-menu-line" />
            </button>
            <ul className="flex items-center ml-4 text-sm">
                <li className="mr-2">
                    <Link
                        href="/dashboard"
                        className="font-medium text-gray-400 hover:text-gray-600"
                    >
                        Dashboard
                    </Link>
                </li>
                <li className="mr-2 font-medium text-gray-600">/</li>
                <li className="mr-2 font-medium text-gray-600">{pageNow}</li>
            </ul>
            <ul className="flex items-center ml-auto">
                <li className="mr-1 dropdown" ref={searchRef}>
                    <button
                        type="button"
                        className="flex items-center justify-center w-8 h-8 text-gray-400 rounded dropdown-toggle hover:bg-gray-50 hover:text-gray-600"
                        onClick={() => setIsOpenSearch(!isOpenSearch)}
                    >
                        <i className="ri-search-line" />
                    </button>
                    {isOpenSearch && (
                        <DropdownMenu className="shadow-md shadow-black/5 py-1.5 rounded-md bg-white border border-gray-100">
                            <Search />
                        </DropdownMenu>
                    )}
                </li>
                <li className="dropdown" ref={notificationRef}>
                    <button
                        type="button"
                        className="flex items-center justify-center w-8 h-8 text-gray-400 rounded dropdown-toggle hover:bg-gray-50 hover:text-gray-600"
                        onClick={() =>
                            setIsOpenNotification(!isOpenNotification)
                        }
                    >
                        <i className="ri-notification-3-line" />
                    </button>
                    {isOpenNotification && <Notification />}
                </li>
                <li className="ml-3 dropdown" ref={dropdownUserRef}>
                    <button
                        type="button"
                        className="flex items-center dropdown-toggle"
                        onClick={() =>
                            setIsOpenDropdownUser(!isOpenDropdownUser)
                        }
                    >
                        <img
                            src="https://placehold.co/32x32"
                            alt=""
                            className="block object-cover w-8 h-8 align-middle rounded"
                        />
                    </button>
                    {isOpenDropdownUser && (
                        <DropdownMenu>
                            <div className="text-[13px] py-1.5 px-4 text-gray-600">
                                <p>{user.email}</p>
                                <p>{user.username}</p>
                            </div>
                            <hr />
                            <DropdownItem
                                icon="ri-user-line"
                                text="Profile"
                                to={route("profile.edit")}
                            />
                            <DropdownItem
                                icon="ri-settings-3-line"
                                text="Settings"
                                to="#"
                            />
                            <DropdownItem
                                icon="ri-logout-box-line"
                                text="Logout"
                                to={route("logout")}
                                method="post"
                            />
                        </DropdownMenu>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default HeaderAdmin;
