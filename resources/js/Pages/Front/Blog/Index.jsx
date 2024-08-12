import PaginationPost from "@/Components/Element/Pagination/PaginationPost";
import SearchBlogHero from "@/Components/Element/Search/SearchBlogHero";
import DisplayPostGrid from "@/Components/Fragment/DisplayPostGrid";
import FeaturedPostsGrid from "@/Components/Fragment/FeaturedPostsGrid";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

const Index = ({ articles, featured }) => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchQuery = queryParams.get("search");
    const hasSearch = searchQuery && searchQuery !== "";
    const hasPage = queryParams.has("page") && queryParams.get("page") !== "1";

    return (
        <>
            <Head>
                <title>Blog</title>
                <meta name="description" content="Blog" />
                <meta name="keywords" content="blog" />

                <meta property="og:title" content="Blog" />
                <meta property="og:description" content="Blog" />
                <meta
                    property="og:image"
                    content="https://ahmadzaki.me/favicon.png"
                />
                <meta property="og:url" content={window.location.href} />

                <meta name="author" content="Ahmad Zaki Alawi" />
                <meta name="copyright" content="Ahmad Zaki Alawi" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
            </Head>

            <GuestLayout>
                <SearchBlogHero />

                {hasSearch || hasPage ? (
                    <></>
                ) : (
                    <section className="pt-4 pb-0">
                        <div className="px-3 mx-auto 2xl:container sm:px-4 xl:px-2">
                            <FeaturedPostsGrid articles={featured} />
                        </div>
                    </section>
                )}

                {/* Recent Blog Post  */}
                <section className="container px-6 py-10 fluid md:px-4">
                    <div className="mb-6 text-3xl font-semibold">
                        <h2>{hasSearch ? "Search Result" : "Recent Post"}</h2>
                        <div className="w-[50%] md:w-[84%] -translate-y-4 float-end h-[4px] bg-gradient-to-r from-transparent to-frontend-secondary -z-1"></div>
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
            </GuestLayout>
        </>
    );
};

export default Index;
