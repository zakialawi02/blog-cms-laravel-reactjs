import CardFeaturedPost from "../Element/Card/CardFeaturedPost";

const FeaturedPostsGrid = ({ articles }) => {
    if (articles.length === 0) return null;

    return (
        <div className="flex flex-row flex-wrap">
            <div className="flex-shrink w-full max-w-full pb-1 lg:w-1/2 lg:pb-0 lg:pr-1">
                <CardFeaturedPost article={articles[0]} isMain={true} />
            </div>
            <div className="flex-shrink w-full max-w-full lg:w-1/2">
                <div className="flex flex-row flex-wrap">
                    {articles.slice(1).map((article, index) => (
                        <div
                            key={index}
                            className="flex-shrink w-full max-w-full px-1 pb-1 my-1 sm:w-1/2"
                        >
                            <CardFeaturedPost
                                article={article}
                                isMain={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedPostsGrid;
