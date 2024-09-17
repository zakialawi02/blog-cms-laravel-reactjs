import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";

const NavHeader = ({ isNavOpen, toggleSearch }) => {
    const [navItemData, setNavItemData] = useState([]);

    useEffect(() => {
        axios
            .get(route("navItemHeaderData"))
            .then((res) => {
                setNavItemData(res.data);
            })
            .catch((error) => {
                console.error(error);
                setNavItemData([
                    { url: "/", name: "Home" },
                    { url: "/blog", name: "Blog" },
                    { url: "/about", name: "About" },
                    { url: "/contact", name: "Contact" },
                ]);
            });
    }, []);

    return (
        <div className="items-center flex-none px-6 md:flex md:justify-between md:border-b md:border-opacity-50 md:border-frontend-dark md:px-14 md:py-1">
            <nav
                id="nav-menu"
                className={`${
                    isNavOpen ? "flex shadow-lg" : "hidden"
                } md:flex absolute items-start md:items-center left-0 right-0  flex-col p-3 text-[1.1rem] md:w-[50rem] md:flex-wrap lg:w-full container font-semibold md:relative md:flex-row md:opacity-100 md:top-0 md:p-0 text-frontend-dark uppercase bg-frontend-base-100 md:bg-transparent z-10`}
            >
                {navItemData.map((item, index) => (
                    <>
                        {item?.children?.length > 0 ? (
                            <Dropdown
                                options={item.children.map((child) => ({
                                    label: child.name,
                                    link: child.url,
                                    extern: child?.extern,
                                }))}
                                label={item.name}
                            />
                        ) : (
                            <>
                                {item.extern ? (
                                    <a
                                        key={index}
                                        className="p-2 duration-300 hover:text-frontend-accent"
                                        href={item.url}
                                    >
                                        {item.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={index}
                                        className="p-2 duration-300 hover:text-frontend-accent"
                                        href={item.url}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </>
                        )}
                    </>
                ))}
            </nav>

            <div
                className="hidden text-xl font-medium hover:text-frontend-accent md:block"
                id="search2-btn"
            >
                <button id="search-btn" onClick={toggleSearch}>
                    <i className="ri-search-line"></i>
                </button>
            </div>
        </div>
    );
};

export default NavHeader;
