import MenuItem from "./MenuItem";

const NavMenu = (props) => {
    const { event } = props;

    return (
        <div
            id="navMenu"
            className="absolute items-start md:items-center left-0 right-0 flex flex-col p-3 text-[1.1rem] md:w-[50rem] md:flex-wrap lg:w-full md:justify-end font-semibold md:relative top-20 md:flex-row md:opacity-100 scale-y-0 opacity-0 md:top-0 md:p-0 uppercase  md:bg-transparent z-[100] bg-Me-primary text-Me-light origin-top transition-all duration-300"
        >
            <MenuItem event={event} link="#home">
                Home
            </MenuItem>
            <MenuItem event={event} link="https://zakialawi.my.id/blog">
                Blog
            </MenuItem>
            <MenuItem event={event} link="#about">
                About
            </MenuItem>
            <MenuItem event={event} link="#portfolio">
                Portfolio
            </MenuItem>
            <MenuItem event={event} link="#contact">
                Contact
            </MenuItem>
            <MenuItem
                event={event}
                link="https://gallery.zakialawi.my.id/"
                className="px-4 mx-1 mb-2 shadow-xl rounded-2xl bg-Me-accent hover:bg-Me-primary hover:border-Me-accent hover:border-2 hover:-translate-y-1 dark:bg-Me-dark-Me-accent dark:hover:border-Me-dark-Me-accent dark:hover:bg-Me-dark-Me-primary dark:hover:text-Me-dark-Me-light"
            >
                Gallery
            </MenuItem>
            <MenuItem
                event={event}
                link="/login"
                className="px-4 mx-1 mb-2 shadow-xl rounded-2xl bg-Me-error hover:bg-Me-primary hover:border-Me-error hover:border-2 hover:-translate-y-1 dark:hover:bg-Me-dark-Me-primary dark:hover:text-Me-dark-Me-light"
            >
                <i className="fa-solid fa-right-to-bracket"></i> Login
            </MenuItem>
        </div>
    );
};

export default NavMenu;
