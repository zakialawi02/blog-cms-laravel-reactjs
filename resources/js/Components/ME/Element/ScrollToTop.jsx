import { useEffect, useState } from "react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollThreshold = 200;
            setIsVisible(scrollY > scrollThreshold);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <a
            href="#"
            className={`${
                isVisible ? "fixed" : "hidden"
            } text-2xl bottom-[7.5rem] right-[2rem] z-[100] animate-bounceHero6s animate-scaleUp`}
        >
            <i className="px-3 py-4 shadow-lg fas fa-arrow-up bg-Me-light text-Me-primary rounded-2xl dark:text-Me-dark-Me-secondary"></i>
        </a>
    );
};

export default ScrollToTop;
