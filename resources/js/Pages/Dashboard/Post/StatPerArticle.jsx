import Card from "@/Components/Element/Card/Card";
import MapChart from "@/Components/Element/Chart/MapChart";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

const StatPerArticle = ({ auth, meta, article, views, total_views }) => {
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        setGraphData(views);
        console.log(graphData);
    });

    return (
        <>
            <Head title={meta.title}></Head>

            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <Card>
                    <h3 className="text-xl">Title: {article.title}</h3>
                </Card>

                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
                    <div className="">
                        <Card className="flex flex-col items-center justify-center w-full">
                            <table
                                id="myTable"
                                className="table table-hover table-striped"
                                style={{ width: "100%" }}
                            >
                                <tbody>
                                    <tr>
                                        <td>Title</td>
                                        <td width="3px">:</td>
                                        <td>{article.title}</td>
                                    </tr>
                                    <tr>
                                        <td>url</td>
                                        <td width="3px">:</td>
                                        <td>
                                            <Link href="#" target="_blank">
                                                ...
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Author</td>
                                        <td width="3px">:</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td width="3px">:</td>
                                        <td>{article.status}</td>
                                    </tr>
                                    <tr>
                                        <td>Published at</td>
                                        <td width="3px">:</td>
                                        <td>{article.published_at}</td>
                                    </tr>
                                    <tr>
                                        <td>Created at</td>
                                        <td width="3px">:</td>
                                        <td>{article.created_at}</td>
                                    </tr>
                                    <tr>
                                        <td>Visitors</td>
                                        <td width="3px">:</td>
                                        <td>{article.total_views}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <Card>
                            <MapChart graphData={graphData} />
                        </Card>

                        <Card>
                            <>
                                <table
                                    id="myTable"
                                    className="table table-hover table-striped"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr>
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
                                        {views.map((view, index) => (
                                            <tr key={index}>
                                                <td>{view.location}</td>
                                                <td>{view.code}</td>
                                                <td>{view.views}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        </Card>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default StatPerArticle;
