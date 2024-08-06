import { useEffect, useState } from "react";
import NavLogo from "./NavLogo";
import NavMenu from "./NavMenu";

const NavBar = () => {
    const [navBarMobile, setNavBarMobile] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const navMenu = document.getElementById("navMenu");
            const width = window.innerWidth;
            const isMobile = width < 780;

            navMenu.classList.toggle("scale-y-100", !isMobile);
            navMenu.classList.toggle("opacity-100", !isMobile);
            setNavBarMobile(isMobile);
        };

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const stickyThreshold = 50;
            setIsSticky(scrollY > stickyThreshold);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        const navMenu = document.getElementById("navMenu");
        const isOpen =
            navBarMobile && navMenu.classList.contains("scale-y-100");

        navMenu.classList.toggle("scale-y-100", !isOpen);
        navMenu.classList.toggle("opacity-100", !isOpen);
        navMenu.classList.toggle("scale-y-0", isOpen);
        navMenu.classList.toggle("opacity-0", isOpen);

        setNavBarMobile(!isOpen);
    };

    const menuClicked = () => {
        const navMenu = document.getElementById("navMenu");
        const isOpen =
            navBarMobile && navMenu.classList.contains("scale-y-100");
        if (isOpen) {
            toggleMenu();
        }
    };

    return (
        <header
            id="navBar"
            className={`z-[100] w-full bg-Me-primary transition-all duration-500 ${
                isSticky ? "sticky top-0 shadow-md" : ""
            } transition-all duration-700 ease-in-out dark:bg-Me-dark-primary`}
        >
            <div
                id="navHead"
                className="z-10 flex items-center justify-between w-full px-6 py-3 min-h-18 md:min-h-20 lg:px-14"
            >
                <NavLogo className="inline-flex">
                    &#62;&#95;
                    <span
                        className={`C1 text-Me-accent ${
                            isSticky ? "hidden" : ""
                        } dark:text-Me-dark-light`}
                    >
                        &#34;
                    </span>
                    <span
                        className={`inline-flex C2 ${isSticky ? "" : "hidden"}`}
                    >
                        &#60;
                    </span>
                </NavLogo>

                <div
                    id="hamMenu"
                    className="fas fa-bars"
                    onClick={() => toggleMenu()}
                ></div>

                <NavMenu event={menuClicked} />
            </div>
        </header>
    );
};

export default NavBar;
