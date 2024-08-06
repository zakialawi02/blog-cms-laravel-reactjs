const NavLogo = (props) => {
    const { className, children = "Title" } = props;
    return (
        <a href="/">
            <div
                id="navLogo"
                className={`${className} max-w-[15rem] text-Me-light text-2xl font-bold uppercase`}
            >
                {children}
            </div>
        </a>
    );
};

export default NavLogo;
