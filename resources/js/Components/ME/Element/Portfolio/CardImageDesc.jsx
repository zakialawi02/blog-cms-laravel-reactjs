const CardImageDesc = (props) => {
    const {
        photo = "#",
        type = "web",
        title = "Untitled",
        children = "...",
    } = props;

    return (
        <div
            className="relative flex flex-col overflow-hidden md:w-1/3-custom xl:w-1/4-custom group animate-scaleUp portfolio-item"
            data-name={type}
        >
            <span>
                <img
                    className="object-cover w-full h-[250px] group-hover:scale-110 transition-all duration-300"
                    src={photo}
                    alt=""
                />
            </span>
            <div className="absolute -bottom-[100%] w-full p-1 bg-opacity-60 bg-Me-secondary max-h-[200px] overflow-hidden line-clamp-4 transition-all duration-200 group-hover:bottom-0 text-Me-dark font-Montserrat">
                <div className="flex items-center justify-between mb-1 font-semibold">
                    <h4>{title}</h4>
                    <a
                        href="#"
                        className="p-2 bg-Me-accent rounded-xl text-Me-light hover:bg-Me-primary hover:text-Me-dark"
                    >
                        View
                    </a>
                </div>
                <div className="">
                    <p>{children}</p>
                </div>
            </div>
        </div>
    );
};

export default CardImageDesc;
