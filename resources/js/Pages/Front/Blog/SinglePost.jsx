import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import Prism from "prismjs";
import "/public/assets/css/prism.css";
import "/public/assets/js/prism.js";
import SharePost from "@/Components/Element/Button/SharePost";
import TagsPost from "@/Components/Element/Button/TagsPost";
import CardAsidePost from "@/Components/Element/Card/CardAsidePost";
import axios from "axios";
import SkeletonOneLine from "@/Components/Element/Skeleton/SkeletonOneLine";
import CommentArticle from "@/Components/Fragment/CommentArticle";

const SinglePost = ({ article }) => {
    const [loading, setLoading] = useState(true);
    const [popularPosts, setPopularPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const pathname = window.location.pathname;
    const segments = pathname.split("/").filter((segment) => segment !== "");
    const secondSegment = segments[1] || "";

    const getPopularPosts = async () => {
        const res = await axios
            .get(route("api.article.popular") + "?max=4")
            .then((res) => {
                setPopularPosts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setPopularPosts([]);
            });
    };

    const getCategories = async () => {
        const res = await axios
            .get(route("api.categories") + "?max=5")
            .then((res) => {
                setCategories(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setCategories([]);
            });
    };

    const getTags = async () => {
        const res = await axios
            .get(route("api.tags") + "?max=10")
            .then((res) => {
                setTags(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setTags([]);
            });
    };

    const fecthData = async () => {
        getPopularPosts()
            .then(() => getCategories())
            .then(() => getTags())
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        Prism.highlightAll();

        fecthData();

        const fetchAndSendData = async () => {
            const urlSlug = window.location.href.split("/").pop();
            try {
                // Mendapatkan IP pengguna
                const response = await axios.get("https://ipinfo.io/json");
                const ip = response.data.ip;
                // Mengirim data ke backend
                const result = await axios.post(route("api.hitVisitor"), {
                    slug: urlSlug,
                    ip: ip,
                });
                // Menampilkan hasil jika diperlukan
                console.log(result.data);
            } catch (error) {
                console.error("Error save stats...");
            }
        };

        fetchAndSendData();
    }, []);

    return (
        <>
            <Head>
                <title>{article.title}</title>
                <meta name="description" content={article.excerpt} />
                <meta
                    name="keywords"
                    content="zakialawi, blog, post, personal, web, developer, laravel, wep programming, webgis, gis, geospatial, surveyor, tutorials, tips, ahmad zaki alawi, geomatika, geomatics, geography"
                />

                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={`${article.title} | zakialawi.my.id`}
                />
                <meta property="og:description" content={article.excerpt} />
                <meta
                    property="og:image"
                    content={window.location.href + article.cover}
                />
                <meta property="og:url" content={window.location.href} />

                <meta name={article.user.username + ", Ahmad Zaki Alawi"} />
                <meta
                    name="copyright"
                    content={article.user.username + ", Ahmad Zaki Alawi"}
                />
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
                                            article?.category?.slug ||
                                                "uncategorized"
                                        )}
                                    >
                                        {article?.category?.category ||
                                            "Uncategorized"}
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

                            <div className="mt-3">
                                <CommentArticle />
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
                                    {loading && (
                                        <>
                                            <SkeletonOneLine height={16} />
                                            <SkeletonOneLine height={16} />
                                            <SkeletonOneLine height={16} />
                                            <SkeletonOneLine height={16} />
                                            <SkeletonOneLine height={16} />
                                        </>
                                    )}

                                    {!loading && popularPosts && (
                                        <>
                                            {popularPosts.map((post, index) => (
                                                <CardAsidePost.ContentArticle
                                                    key={index}
                                                    article={post}
                                                />
                                            ))}
                                        </>
                                    )}

                                    {!loading && !popularPosts && (
                                        <p className="my-2 text-center font-regular">
                                            No Popular Posts Available
                                        </p>
                                    )}
                                </CardAsidePost.Body>
                            </CardAsidePost>

                            <CardAsidePost id="categories">
                                <div className="text-xl font-bold text-center">
                                    <h3>Categories</h3>
                                </div>

                                <CardAsidePost.Body>
                                    {loading && (
                                        <>
                                            <SkeletonOneLine height={6} />
                                            <SkeletonOneLine height={6} />
                                            <SkeletonOneLine height={6} />
                                            <SkeletonOneLine height={6} />
                                            <SkeletonOneLine height={6} />
                                        </>
                                    )}

                                    <div className="flex flex-wrap">
                                        {!loading && categories && (
                                            <ul className="flex flex-col gap-3 p-2">
                                                {categories.map(
                                                    (item, index) => (
                                                        <li key={index}>
                                                            <Link
                                                                href={route(
                                                                    "article.category",
                                                                    {
                                                                        slug: item.slug,
                                                                    }
                                                                )}
                                                                className="font-bold hover:text-frontend-primary"
                                                            >
                                                                <i className="mr-2 text-xl ri-skip-right-line text-info"></i>
                                                                {item.category}
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}

                                        {!loading && !categories && (
                                            <p className="my-2 text-center font-regular">
                                                No Category Available
                                            </p>
                                        )}
                                    </div>
                                </CardAsidePost.Body>
                            </CardAsidePost>

                            <CardAsidePost id="popular-post">
                                <div className="text-xl font-bold text-center">
                                    <h3>Tags</h3>
                                </div>

                                {loading && <SkeletonOneLine height={24} />}

                                <CardAsidePost.Body>
                                    {!loading && tags && (
                                        <>
                                            <div className="flex flex-wrap">
                                                {tags.map((tag, index) => (
                                                    <CardAsidePost.ContentBadge
                                                        key={index}
                                                        data={tag}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {!loading && !tags && (
                                        <p className="my-2 text-center font-regular">
                                            No Tags Available
                                        </p>
                                    )}
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
