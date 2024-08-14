import CardPost from "../Element/Card/CardPost";

const DisplayPost = ({ articles }) => {
    return (
        <div className="grid grid-cols-1 gap-8 mb-5 md:grid-cols-2 xl:grid-cols-3">
            {articles.length === 0 ? (
                <p className="my-2 ">No Article Posts Available</p>
            ) : (
                articles.data.map((item, index) => (
                    <CardPost key={index} image={item.cover}>
                        <CardPost.Body
                            author={item.user.username}
                            toAuthor={route("article.user", item.user.username)}
                            published={new Date(
                                item.published_at
                            ).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                            })}
                        >
                            <CardPost.Title
                                url={route("article.show", {
                                    year: item.published_at.substring(0, 4),
                                    slug: item.slug,
                                })}
                            >
                                {item.title}
                            </CardPost.Title>
                            <CardPost.Category>
                                {item?.category?.category || "Uncategorized"}
                            </CardPost.Category>
                            <CardPost.Excerpt>{item.excerpt}</CardPost.Excerpt>
                        </CardPost.Body>
                    </CardPost>
                ))
            )}
        </div>
    );
};

export default DisplayPost;
