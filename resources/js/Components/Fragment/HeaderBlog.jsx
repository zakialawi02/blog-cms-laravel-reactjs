import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Dropdown from "../Element/Dropdown/Dropdown";

const HeaderBlog = () => {
    const { auth } = usePage().props;
    const [webName, setWebName] = useState("BLOG");
    const [navItemData, setNavItemData] = useState([]);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = () => setIsNavOpen(!isNavOpen);

    useEffect(() => {
        const handleResize = () => {
            setIsNavOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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

    useEffect(() => {
        axios
            .get("/meta-web")
            .then((response) => {
                setWebName(response.data.web_name);
            })
            .catch((error) => {
                console.error(error);
                setWebName("Blog");
            });
    }, []);

    return (
        <>
            <header>
                <div className="z-10 flex items-center justify-between w-full px-6 min-h-20 md:px-14 bg-frontend-base-100">
                    <div
                        id="logo-nav"
                        className="max-w-[20rem] text-frontend-dark font-bold uppercase"
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-xl "
                        >
                            <img src="/logo/logo.webp" className="w-8 h-8" />
                            <span className="px-2">{webName}</span>
                        </Link>
                    </div>

                    <div
                        className="text-xl font-medium md:hidden"
                        id="hamburger"
                    >
                        <button id="ham-btn" onClick={toggleNav}>
                            {isNavOpen ? (
                                <i className="ri-close-line"></i>
                            ) : (
                                <i className="ri-menu-line"></i>
                            )}
                        </button>
                    </div>

                    <nav
                        id="nav-menu"
                        className={`${
                            isNavOpen ? "flex shadow-lg" : "hidden"
                        } md:flex absolute items-start md:items-center left-0 right-0  flex-col p-3 text-[1.1rem] md:w-[50rem] md:flex-wrap lg:w-full md:justify-end font-semibold md:relative top-20 md:flex-row md:opacity-100 md:top-0 md:p-0 text-frontend-dark uppercase bg-frontend-base-100 md:bg-transparent z-10`}
                    >
                        {navItemData.map((item, index) => (
                            <>
                                {item?.children?.length > 0 ? (
                                    <Dropdown
                                        options={item.children.map((child) => ({
                                            label: child.name,
                                            link: child.url,
                                        }))}
                                        label={item.name}
                                    />
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
                        ))}

                        <div className="flex flex-col items-start gap-2 ml-2 md:items-center md:flex-row">
                            {auth.user ? (
                                <>
                                    <Link
                                        className="p-1 px-4 text-white duration-300 border-2 bg-frontend-accent border-frontend-accent rounded-xl hover:bg-frontend-light hover:text-frontend-accent"
                                        title="Dashboard"
                                        href={route("admin.dashboard")}
                                    >
                                        <i className="ri-function-line"></i>
                                    </Link>

                                    <Link
                                        className="p-1 px-4 duration-300 border-2 text-frontend-secondary border-frontend-secondary rounded-xl hover:border-frontend-error hover:text-frontend-error"
                                        title="Logout"
                                        href={route("logout")}
                                        as="button"
                                        method="post"
                                    >
                                        <i className="ri-logout-box-line"></i>
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    className="inline-flex p-1 px-4 duration-300 border-2 text-frontend-primary border-frontend-primary rounded-xl hover:bg-frontend-info hover:border-frontend-info hover:text-frontend-light"
                                    title="Login"
                                    href="/login"
                                >
                                    <i className="ri-lock-2-fill"></i> Login
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default HeaderBlog;
