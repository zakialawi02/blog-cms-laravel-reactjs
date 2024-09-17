import { useEffect, useState } from "react";
import TopBar from "../Element/Header/TopBar";
import SearchPopup from "../Element/Search/SearchPopup";
import NavHeader from "../Element/Header/NavHeader";
import HeaderMid from "../Element/Header/HeaderMid";

const HeaderBlog = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleNav = () => setIsNavOpen(!isNavOpen);
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsNavOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <header className="">
                <SearchPopup
                    isSearchOpen={isSearchOpen}
                    toggleSearch={toggleSearch}
                />

                <TopBar />

                <HeaderMid
                    isNavOpen={isNavOpen}
                    toggleNav={toggleNav}
                    toggleSearch={toggleSearch}
                />

                <NavHeader isNavOpen={isNavOpen} toggleSearch={toggleSearch} />
            </header>
        </>
    );
};

export default HeaderBlog;
