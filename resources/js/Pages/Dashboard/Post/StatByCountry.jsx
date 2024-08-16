import Card from "@/Components/Element/Card/Card";
import MapChart from "@/Components/Element/Chart/MapChart";
import SkeletonOneLine from "@/Components/Element/Skeleton/SkeletonOneLine";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useEffect, useState } from "react";

const StatByCountry = ({ auth, meta }) => {
    const [graphData, setGraphData] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStats = async () => {
        const res = await axios
            .get(route("admin.posts.statslocation"))
            .then((res) => {
                setData(res.data);
                setGraphData(res.data.views);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const getStatistics = async () => {
        getStats()
            .then(() => setLoading(false))
            .catch((error) => {
                console.error(error);
                setLoading(true);
            });
    };

    useEffect(() => {
        getStatistics();
    }, []);

    return (
        <>
            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <Card>
                    <h3 className="text-xl">
                        Total Visitors : {data.total_views}
                    </h3>
                </Card>

                <Card>
                    <MapChart graphData={graphData} />
                </Card>

                <Card>
                    <div className="mb-3 overflow-x-auto">
                        {loading ? (
                            <>
                                <SkeletonOneLine height={48} />
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
                                        {data.views.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="3"
                                                    className="p-6 m-1 text-base font-medium text-center"
                                                >
                                                    No data
                                                </td>
                                            </tr>
                                        ) : (
                                            <>
                                                {data.views.map(
                                                    (item, index) => (
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
                    </div>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default StatByCountry;
