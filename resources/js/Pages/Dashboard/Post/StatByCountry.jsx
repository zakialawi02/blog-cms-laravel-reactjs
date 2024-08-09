import Card from "@/Components/Element/Card/Card";
import MapChart from "@/Components/Element/Chart/MapChart";
import SkeletonOneLine from "@/Components/Element/Skeleton/SkeletonOneLine";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

const StatByCountry = ({ auth, meta }) => {
    const [graphData, setGraphData] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStats = async () => {
        const res = await axios
            .get(route("admin.posts.statslocation"))
            .then((res) => {
                console.log(res.data);
                setData(res.data);
                setGraphData(res.data.views);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getStatistics = async () => {
        getStats()
            .then(() => setLoading(false))
            .catch((error) => {
                console.log(error);
                setLoading(true);
            });
    };

    useEffect(() => {
        getStatistics();
    }, []);

    return (
        <>
            <Head title={meta.title}></Head>

            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <Card>
                    <h3 className="text-xl">
                        Total Visitors {data.total_views}
                    </h3>
                </Card>

                <Card>
                    {loading ? (
                        <SkeletonOneLine height={48} />
                    ) : (
                        <>
                            <MapChart graphData={graphData} />
                        </>
                    )}
                </Card>

                <Card>
                    <div className="mb-3 overflow-x-auto">
                        {loading ? (
                            <>
                                <SkeletonOneLine height={40} />
                            </>
                        ) : (
                            <>
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs uppercase border-b border-gray-700">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                sortable={false}
                                                name="coutry"
                                            >
                                                Country
                                            </TableHeading>

                                            <TableHeading
                                                sortable={false}
                                                name="code"
                                            >
                                                Country Code
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
                                        {data.views.map((item, index) => (
                                            <tr
                                                className="border-b"
                                                key={index}
                                            >
                                                <td className="p-2">
                                                    {item.location}
                                                </td>
                                                <td className="p-2">
                                                    {item.code}
                                                </td>
                                                <td className="p-2">
                                                    {item.total_views}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default StatByCountry;
