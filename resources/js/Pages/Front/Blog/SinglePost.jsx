import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import Prism from "prismjs";
import "/public/assets/css/prism.css";
import "/public/assets/js/prism.js";
import { useEffect } from "react";
import SharePost from "@/Components/Element/Button/SharePost";
import TagsPost from "@/Components/Element/Button/TagsPost";
import CardAsidePost from "@/Components/Element/Card/CardAsidePost";

const SinglePost = ({ article }) => {
    const pathname = window.location.pathname;
    const segments = pathname.split("/").filter((segment) => segment !== "");
    const secondSegment = segments[1] || "";

    console.log(article);

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <>
            <Head>
                <title>{article.title}</title>
                <meta name="description" content={article.excerpt} />
                <meta name="keywords" content="blog" />

                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.excerpt} />
                <meta
                    property="og:image"
                    content="https://ahmadzaki.me/favicon.png"
                />
                <meta property="og:url" content="https://ahmadzaki.me/blog" />

                <meta name="author" content="Ahmad Zaki Alawi" />
                <meta name="copyright" content="Ahmad Zaki Alawi" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
            </Head>

            <GuestLayout className="container w-full p-6 md:p-10">
                <div className="mt-6">
                    <div id="breadcrumb" className="">
                        <nav aria-label="breadcrumb">
                            <ol className="flex flex-row flex-wrap items-center">
                                <li className="">
                                    <Link
                                        className="text-frontend-dark hover:text-frontend-accent breadcrumb-next"
                                        href="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="">
                                    <Link
                                        className="text-frontend-dark hover:text-frontend-accent breadcrumb-next"
                                        href="/blog"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li className="">
                                    <Link
                                        className="text-frontend-dark hover:text-frontend-accent breadcrumb-next"
                                        href={route(
                                            "article.year",
                                            secondSegment
                                        )}
                                    >
                                        {secondSegment}
                                    </Link>
                                </li>
                                <li className="">
                                    <Link
                                        className="text-frontend-dark hover:text-frontend-accent breadcrumb-next"
                                        href={route(
                                            "article.category",
                                            article.category.slug
                                        )}
                                    >
                                        {article.category.category}
                                    </Link>
                                </li>
                                <li className="">
                                    <Link
                                        className="text-frontend-dark hover:text-frontend-accent"
                                        aria-current="page"
                                        href="#"
                                    >
                                        {article.title}
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <div
                        id="main"
                        className="flex flex-col flex-wrap flex-auto flex-grow gap-4 md:flex-row text-frontend-dark"
                    >
                        <div
                            id="post"
                            className="w-full md:w-[60%] md:flex-grow"
                        >
                            <div id="main-content" className="">
                                <div
                                    id="post-header"
                                    className="py-1 my-2 mb-3"
                                >
                                    <h1 className="mb-2 text-3xl font-bold">
                                        {article.title}
                                    </h1>
                                    <div className="inline-flex items-center">
                                        <a
                                            href={route(
                                                "article.user",
                                                article.user.username
                                            )}
                                            className="inline-flex items-center after:content-['.'] after:mx-2 after:top-[-3px] after:relative after:px-1 after:font-black after:text-frontend-secondary  hover:text-frontend-primary gap-1"
                                            target="_blank"
                                        >
                                            <img
                                                className="w-6"
                                                src={
                                                    article.user
                                                        .profile_photo_path
                                                }
                                                alt="author"
                                            />
                                            {article.user.username}
                                        </a>
                                        <a
                                            href={route("article.month", {
                                                year: article.published_at.substring(
                                                    0,
                                                    4
                                                ),
                                                month: article.published_at.substring(
                                                    5,
                                                    7
                                                ),
                                            })}
                                            className="hover:text-frontend-primary"
                                            target="_blank"
                                        >
                                            {new Date(
                                                article.created_at
                                            ).toDateString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div id="feature-image" className="mb-3">
                                <img
                                    className="max-h-[26rem] w-full rounded-lg object-cover object-center"
                                    src={article.cover}
                                    alt="Feature image"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "/assets/img/image-placeholder.webp";
                                    }}
                                />
                            </div>

                            <div id="post-content" className="text-lg">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: article.content,
                                    }}
                                />
                            </div>

                            <div className="py-1 my-2 border-b-2 border-frontend-dark border-opacity-40"></div>

                            <div className="post-bottom">
                                <div className="flex items-center justify-between text-frontend-secondary">
                                    <div className="">
                                        <TagsPost tags={article.tags} />
                                    </div>

                                    <div className="text-2xl">
                                        <SharePost />
                                    </div>
                                </div>
                            </div>

                            <div id="author"></div>

                            <div className="py-1 my-2 border-b-2 border-frontend-dark border-opacity-40"></div>

                            <div id="comments">
                                <div id="" className="mt-4">
                                    <div className="mb-3">
                                        <h2 className="text-3xl font-bold">
                                            Comments
                                        </h2>
                                    </div>

                                    <div id="comments-section"></div>

                                    <div className="flex justify-start mt-3">
                                        <button
                                            type="button"
                                            id="btn-show-comments-section"
                                            className="px-4 py-2 font-bold text-white transition-all duration-300 rounded-lg bg-frontend-primary hover:bg-frontend-secondary focus:outline-none"
                                        >
                                            Show Comments Section
                                        </button>
                                    </div>

                                    <div
                                        id="content-comment-container"
                                        className="mt-10"
                                    >
                                        {" "}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            id="sidebar"
                            className="w-full md:w-[30%] mt-10 md:mt-8"
                        >
                            <CardAsidePost id="popular-post">
                                <div className="text-xl font-bold text-center">
                                    <h3>Popular Posts</h3>
                                </div>

                                <CardAsidePost.Body>
                                    <CardAsidePost.ContentArticle />
                                </CardAsidePost.Body>
                            </CardAsidePost>

                            <CardAsidePost id="categories">
                                <div className="text-xl font-bold text-center">
                                    <h3>Categories</h3>
                                </div>

                                <CardAsidePost.Body>
                                    <CardAsidePost.ContentList />
                                    <div className="flex flex-wrap">
                                        <CardAsidePost.ContentBadge
                                            tags={article.tags}
                                        />
                                    </div>
                                </CardAsidePost.Body>
                            </CardAsidePost>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
};

export default SinglePost;