import CardPost2 from "@/Components/Element/Card/CardPost2";
import PaginationPost from "@/Components/Element/Pagination/PaginationPost";
import DisplayPostGrid from "@/Components/Fragment/DisplayPostGrid";
import FeaturedPostsGrid from "@/Components/Fragment/FeaturedPostsGrid";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";

const Index = ({ articles, featured }) => {
    const [randomPosts, setRandomPosts] = useState([]);
    const queryParams = new URLSearchParams(window.location.search);
    const searchQuery = queryParams.get("search");
    const hasSearch = searchQuery && searchQuery !== "";
    const hasPage = queryParams.has("page") && queryParams.get("page") !== "1";
    const pathname = window.location.pathname;
    const segments = pathname.split("/").filter((segment) => segment !== "");
    const segmentUrl = segments[1] || "";
    const segmentClass = segments[2] || "";

    const gethRandomPosts = async () => {
        const res = await axios
            .get(route("api.article.random") + "?max=4")
            .then((res) => {
                setRandomPosts(res.data);
            })
            .catch((err) => {
                console.error(err);
                setRandomPosts([]);
            });
    };

    useEffect(() => {
        gethRandomPosts();
    }, []);

    return (
        <>
            <Head>
                <title>{`Blog ${
                    segmentUrl
                        ? " in Category " + segmentClass.replace("-", "")
                        : ""
                }`}</title>
                <meta
                    name="description"
                    content={`Blog${
                        segmentUrl
                            ? " in Category " + segmentClass.replace("-", "")
                            : ""
                    } | Zakialawi Personal Blog & web platform | zakialawi website`}
                />
                <meta
                    name="keywords"
                    content="zakialawi, blog, personal, web, developer, laravel, wep programming, webgis, gis, geospatial, surveyor, tutorials, tips, ahmad zaki alawi, geomatika, geomatics, geography"
                />

                <meta
                    property="og:title"
                    content={`Blog${
                        segmentUrl
                            ? " in Category " + segmentClass.replace("-", "")
                            : ""
                    } | zakialawi website`}
                />
                <meta
                    property="og:description"
                    content={`Blog${
                        segmentUrl
                            ? " in Category " + segmentClass.replace("-", "")
                            : ""
                    } | zakialawi website | Discover the latest stories, thoughts and inspiration.`}
                />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:url" content={window.location.href} />

                <meta name="author" content="Ahmad Zaki Alawi" />
                <meta name="copyright" content="Ahmad Zaki Alawi" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />

                <link rel="canonical" href={window.location.href} />
            </Head>

            <GuestLayout>
                {hasSearch || hasPage ? (
                    <></>
                ) : (
                    <>
                        {segmentUrl !== "categories" && (
                            <section className="pt-4 pb-0">
                                <div className="px-3 mx-auto 2xl:container sm:px-4 xl:px-2">
                                    <FeaturedPostsGrid articles={featured} />
                                </div>
                            </section>
                        )}
                    </>
                )}

                <div id="ads-top">
                    <Adsense
                        client="ca-pub-8778037825157711"
                        slot="8712524304"
                    />
                </div>

                {/* Recent Blog Post  */}
                <section className="container px-6 py-10 fluid md:px-4">
                    <div className="mb-6 text-3xl font-semibold">
                        <h2>{hasSearch ? "Search Result" : "Recent Post"}</h2>
                        <div className="w-[50%] md:w-[84%] -translate-y-4 float-end h-[4px] bg-gradient-to-r from-transparent to-frontend-secondary -z-10"></div>
                        {hasSearch && (
                            <p className="text-xl font-normal">
                                keyword: {searchQuery}
                            </p>
                        )}
                    </div>

                    <DisplayPostGrid articles={articles} />

                    <div className="flex items-center justify-end">
                        <PaginationPost
                            links={articles.links}
                            current={articles.current_page}
                            last={articles.last_page}
                        />
                    </div>
                </section>

                <div id="ads-bottom">
                    <Adsense
                        client="ca-pub-8778037825157711"
                        slot="8712524304"
                    />
                </div>

                {/* Random Blog Post  */}
                {randomPosts.length > 0 && (
                    <section className="container px-6 py-6 fluid md:px-4">
                        <h2 className="mb-5 text-2xl font-bold">You Missed</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                            {randomPosts.map((post, index) => (
                                <CardPost2
                                    key={index}
                                    title={post.title}
                                    category={post?.category?.category}
                                    link={route("article.show", {
                                        year: post.published_at.substring(0, 4),
                                        slug: post.slug,
                                    })}
                                    cover={post.cover}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </GuestLayout>
        </>
    );
};

export default Index;
