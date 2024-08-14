import PaginationPost from "@/Components/Element/Pagination/PaginationPost";
import DisplayPostGrid from "@/Components/Fragment/DisplayPostGrid";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

const Archive = ({ articles }) => {
    const pathname = window.location.pathname;
    const segments = pathname.split("/").filter((segment) => segment !== "");
    const archiveSegment = segments[2] || "";

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
                {/* Recent Blog Post  */}
                <section className="container px-6 py-10 fluid md:px-4">
                    <div className="mb-6 text-3xl font-semibold">
                        <h2>Archive : {archiveSegment.toUpperCase()}</h2>
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

export default Archive;
