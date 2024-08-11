import Card from "@/Components/Element/Card/Card";
import MapChart from "@/Components/Element/Chart/MapChart";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

const StatPerArticle = ({ auth, meta, article, views }) => {
    const [graphData, setGraphData] = useState([]);
    // views = [];

    useEffect(() => {
        setGraphData(views);
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
                        <Card className="flex flex-col justify-center w-full">
                            <table
                                id="myTable"
                                className="table table-hover table-striped"
                                style={{ width: "100%" }}
                            >
                                <tbody>
                                    <tr className="border-b">
                                        <td>Title</td>
                                        <td width="4px">:</td>
                                        <td>{article.title}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td>url</td>
                                        <td width="4px">:</td>
                                        <td>
                                            <Link
                                                href="#"
                                                target="_blank"
                                                className="text-backend-primary hover:text-backend-secondary hover:underline"
                                            >
                                                {route("article.show", {
                                                    year: article.published_at.substring(
                                                        0,
                                                        4
                                                    ),
                                                    slug: article.slug,
                                                })}
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td>Author</td>
                                        <td width="4px">:</td>
                                        <td>
                                            <p
                                                className={`px-2 m-1 rounded text-backend-light  w-fit ${
                                                    article.user.role == "admin"
                                                        ? "bg-backend-primary"
                                                        : article.user.role ==
                                                          "writer"
                                                        ? "bg-backend-secondary"
                                                        : "bg-backend-muted"
                                                }`}
                                            >
                                                {article.user.username}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td>Status</td>
                                        <td width="4px">:</td>
                                        <td>
                                            <p
                                                className={`px-2 m-1 rounded text-backend-light  w-fit ${
                                                    article.status ==
                                                    "published"
                                                        ? "bg-backend-success"
                                                        : "bg-backend-muted"
                                                }`}
                                            >
                                                {article.status}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td width="100rem">Published at</td>
                                        <td width="4px">:</td>
                                        <td>
                                            {new Date(
                                                article.published_at
                                            ).toDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td>Created at</td>
                                        <td width="4px">:</td>
                                        <td>
                                            {new Date(
                                                article.created_at
                                            ).toDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}{" "}
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td>Visitors</td>
                                        <td width="4px">:</td>
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
                            <table
                                id="myTable"
                                className="table table-hover table-striped"
                                style={{ width: "100%" }}
                            >
                                <thead className="border-b border-gray-700">
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
                                    {views.map((view, index) => (
                                        <tr key={index} className="border-b">
                                            <td>{view.location}</td>
                                            <td>{view.code}</td>
                                            <td>{view.views}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default StatPerArticle;
