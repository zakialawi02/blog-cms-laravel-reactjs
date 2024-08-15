import ButtonBE from "@/Components/Element/Button/ButtonBE";
import Card from "@/Components/Element/Card/Card";
import StockChartTimeSeries from "@/Components/Element/Chart/StockChartTimeSeries";
import SkeletonOneLine from "@/Components/Element/Skeleton/SkeletonOneLine";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

const recentSection = () => {
    return (
        <>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Recent Post</h1>
            </div>

            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-4"></div>
        </>
    );
};

const popularSection = () => {
    return (
        <>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Popular Post</h1>
            </div>

            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-4"></div>
        </>
    );
};

const StatView = ({ auth, meta }) => {
    const [graphData, setGraphData] = useState([]);
    const [recent, setRecent] = useState([]);
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(true);
    const [section, setSection] = useState("recent");

    const getLatst6Months = async () => {
        const res = await axios
            .get(route("admin.posts.statslast6months"))
            .then((res) => {
                setGraphData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getStatsRecent = async () => {
        const res = await axios
            .get(route("admin.posts.statsrecent"))
            .then((res) => {
                setRecent(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getStatsPopular = async () => {
        const res = await axios
            .get(route("admin.posts.statspopular"))
            .then((res) => {
                setPopular(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getStatistics = async () => {
        getLatst6Months()
            .then(() => getStatsRecent())
            .then(() => getStatsPopular())
            .then(() => setLoading(false))
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getStatistics();
    }, []);

    const clickSection = (e) => {
        setSection(e.target.id);
    };

    return (
        <>
            <Head title={meta.title}></Head>

            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <Card>
                    {loading ? (
                        <SkeletonOneLine height={48} />
                    ) : (
                        <StockChartTimeSeries graphData={graphData} />
                    )}
                </Card>

                <Card>
                    <div className="mb-4">
                        <ButtonBE
                            id="recent"
                            className="rounded-r-none"
                            color={` ${
                                section == "recent"
                                    ? "bg-backend-primary/85"
                                    : "bg-backend-primary"
                            }`}
                            onClick={clickSection}
                        >
                            Recent
                        </ButtonBE>
                        <ButtonBE
                            id="popular"
                            className="rounded-l-none"
                            color={` ${
                                section == "popular"
                                    ? "bg-backend-primary/85"
                                    : "bg-backend-primary"
                            }`}
                            onClick={clickSection}
                        >
                            Popular
                        </ButtonBE>
                    </div>

                    <div className="mb-4">
                        <div className="mb-3 overflow-x-auto">
                            {loading ? (
                                <>
                                    <SkeletonOneLine height={48} />
                                </>
                            ) : (
                                <>
                                    {section == "recent" ? (
                                        <>
                                            <table className="w-full text-sm text-left">
                                                <thead className="text-xs uppercase border-b border-gray-700">
                                                    <tr className="text-nowrap">
                                                        <TableHeading
                                                            sortable={false}
                                                            name="viewed_at"
                                                        >
                                                            Date Time
                                                        </TableHeading>

                                                        <TableHeading
                                                            width="w-[30rem]"
                                                            sortable={false}
                                                            name="title"
                                                        >
                                                            Article
                                                        </TableHeading>

                                                        <TableHeading
                                                            sortable={false}
                                                            name="ip_address"
                                                        >
                                                            IP
                                                        </TableHeading>

                                                        <TableHeading
                                                            sortable={false}
                                                            name="location"
                                                        >
                                                            Location
                                                        </TableHeading>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recent.length == 0 ? (
                                                        <tr>
                                                            <td
                                                                colSpan="4"
                                                                className="p-6 m-1 text-base font-medium text-center"
                                                            >
                                                                No data
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        <>
                                                            {recent.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        className="border-b"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td className="p-2 min-w-28">
                                                                            {new Date(
                                                                                item.viewed_at
                                                                            ).toLocaleString(
                                                                                "en-US",
                                                                                {
                                                                                    day: "numeric",
                                                                                    month: "short",
                                                                                    year: "numeric",
                                                                                    hour: "numeric",
                                                                                    minute: "numeric",
                                                                                }
                                                                            )}
                                                                        </td>
                                                                        <td className="p-2 min-w-60">
                                                                            <Link
                                                                                preserveState
                                                                                href={
                                                                                    `/dashboard/stats/posts/` +
                                                                                    item
                                                                                        .article
                                                                                        .slug
                                                                                }
                                                                                className="text-backend-primary hover:text-backend-secondary"
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                {
                                                                                    item
                                                                                        .article
                                                                                        .title
                                                                                }
                                                                            </Link>
                                                                        </td>
                                                                        <td className="p-2">
                                                                            {
                                                                                item.ip_address
                                                                            }
                                                                        </td>
                                                                        <td className="p-2 min-w-28">
                                                                            {
                                                                                item.location
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                </tbody>
                                            </table>
                                        </>
                                    ) : (
                                        <>
                                            <table className="w-full text-sm text-left">
                                                <thead className="text-xs uppercase border-b border-gray-700">
                                                    <tr className="text-nowrap">
                                                        <TableHeading
                                                            width="w-[30rem]"
                                                            sortable={false}
                                                            name="title"
                                                        >
                                                            Title
                                                        </TableHeading>

                                                        <TableHeading
                                                            sortable={false}
                                                            name="status"
                                                        >
                                                            Status
                                                        </TableHeading>

                                                        <TableHeading
                                                            sortable={false}
                                                            name="published_at"
                                                        >
                                                            Published
                                                        </TableHeading>

                                                        <TableHeading
                                                            sortable={false}
                                                            name="visitors"
                                                        >
                                                            Visitors
                                                        </TableHeading>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {popular.length == 0 ? (
                                                        <tr>
                                                            <td
                                                                colSpan="4"
                                                                className="p-6 m-1 text-base font-medium text-center"
                                                            >
                                                                No data
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        <>
                                                            {popular.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        className="border-b"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td className="min-w-60 max-w-lg p-2">
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </td>
                                                                        <td className="p-2">
                                                                            {
                                                                                item.status
                                                                            }
                                                                        </td>
                                                                        <td className="p-2 min-w-28">
                                                                            {new Date(
                                                                                item.published_at
                                                                            ).toLocaleDateString(
                                                                                "en-US",
                                                                                {
                                                                                    year: "numeric",
                                                                                    month: "long",
                                                                                    day: "numeric",
                                                                                }
                                                                            )}
                                                                        </td>
                                                                        <td className="p-2">
                                                                            {
                                                                                item.total_views
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                </tbody>
                                            </table>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default StatView;
