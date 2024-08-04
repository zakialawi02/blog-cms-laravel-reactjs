const Search = ({ className = "" }) => {
    className = className
        ? className
        : "py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500";

    return (
        <form action="" className="p-4">
            <div className="relative w-full">
                <input
                    type="text"
                    className={`${className}`}
                    placeholder="Search..."
                />
                <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            </div>
        </form>
    );
};

export default Search;
