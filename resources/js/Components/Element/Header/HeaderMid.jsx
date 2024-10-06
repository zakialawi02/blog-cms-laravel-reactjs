import { Adsense } from "@ctrl/react-adsense";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

const HeaderMid = ({ isNavOpen, toggleNav, toggleSearch }) => {
    const [webName, setWebName] = useState("BLOG");

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
        <div className="z-10 flex items-center justify-between w-full px-6 border-b border-opacity-50 min-h-20 md:px-14 bg-frontend-base-100 border-frontend-dark">
            <div
                id="logo-nav"
                className="max-w-[20rem] text-frontend-dark font-bold uppercase"
            >
                <Link
                    href="/blog"
                    className="inline-flex items-center text-xl max-w-80"
                >
                    <img src="/logo/logo.webp" className="p-1 max-w-14" />
                    <span id="web_name" className="px-2">
                        {webName}
                    </span>
                </Link>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-xl font-medium md:hidden" id="hamburger">
                    <button id="ham-btn" onClick={toggleNav}>
                        {isNavOpen ? (
                            <i className="ri-close-line"></i>
                        ) : (
                            <i className="ri-menu-line"></i>
                        )}
                    </button>
                </div>

                <div
                    className="text-xl font-medium hover:text-frontend-accent md:hidden"
                    id="search-btn"
                >
                    <button id="search-btn" onClick={toggleSearch}>
                        <i className="ri-search-line"></i>
                    </button>
                </div>
            </div>

            <div
                id="ads-header"
                className="max-w-[800px] max-h-[100px] overflow-hidden hidden md:block"
            >
                <Adsense
                    style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        padding: "10px !important",
                        textAlign: "center",
                    }}
                    client="ca-pub-8778037825157711"
                    slot="9105886912"
                    responsive="true"
                    format="auto"
                />
            </div>
        </div>
    );
};

export default HeaderMid;
