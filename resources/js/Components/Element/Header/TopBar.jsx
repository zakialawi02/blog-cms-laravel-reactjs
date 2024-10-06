import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const TopBar = () => {
    const { auth } = usePage().props;
    const [webMeta, setWebMeta] = useState([]);

    useEffect(() => {
        axios
            .get("/meta-web")
            .then((response) => {
                setWebMeta({
                    link_fb: response.data.link_fb,
                    link_ig: response.data.link_ig,
                    link_twitter: response.data.link_twitter,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="w-full bg-gray-800">
            <div className="container px-5 py-1 md:px-7 text-frontend-light">
                <div className="items-center text-sm md:flex md:justify-between">
                    <div className="hidden md:flex md:gap-4">
                        <a href="/" className="hover:text-frontend-primary">
                            Home
                        </a>
                        <a
                            href="https://zakialawi.my.id/"
                            className="hover:text-frontend-primary"
                        >
                            About
                        </a>
                        <a
                            href="/p/contact"
                            className="hover:text-frontend-primary"
                        >
                            Contact
                        </a>
                    </div>

                    <div className="flex flex-row items-center justify-between gap-4">
                        <div className="flex gap-2 text-base">
                            <a
                                href={webMeta.link_fb ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-frontend-primary"
                            >
                                <i className="ri-facebook-circle-fill" />
                            </a>
                            <a
                                href={webMeta.link_ig ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-frontend-primary"
                            >
                                <i className="ri-instagram-fill" />
                            </a>
                            <a
                                href={webMeta.link_twitter ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-frontend-primary"
                            >
                                <i className="ri-twitter-x-fill"></i>
                            </a>
                        </div>

                        <div className="flex gap-2">
                            {auth.user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="hover:text-frontend-accent"
                                    >
                                        Dashboard
                                    </Link>

                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="hover:text-frontend-error"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="hover:text-frontend-primary"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
