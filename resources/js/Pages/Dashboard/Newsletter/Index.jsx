import Card from "@/Components/Element/Card/Card";
import PaginationDashboard from "@/Components/Element/Pagination/PaginationDashboard";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router } from "@inertiajs/react";

const Index = ({ auth, data, meta, queryParams = null }) => {
    queryParams = queryParams || {};

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("admin.newsletter.index"), queryParams);
    };

    const filterChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("admin.newsletter.index"), queryParams);
    };

    const deleteItem = (id) => {
        router.delete(route("admin.newsletter.destroy", id));
    };

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex, nofollow" />
            </Head>

            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <Card>
                    <div className="">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase border-b border-gray-700">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            name="email"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Email
                                        </TableHeading>

                                        <TableHeading
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Create Date
                                        </TableHeading>

                                        <th className="w-40 px-3 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.length === 0 ? (
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
                                            {data.data.map((item, index) => (
                                                <tr
                                                    className="border-b"
                                                    key={index}
                                                >
                                                    <td className="px-3 py-2">
                                                        {item.email}
                                                    </td>
                                                    <td className="px-3 py-2 text-nowrap">
                                                        {new Date(
                                                            item.created_at
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </td>
                                                    <td className="text-nowrap">
                                                        <button
                                                            onClick={(e) =>
                                                                deleteItem(item)
                                                            }
                                                            className="w-8 p-1 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-error"
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <PaginationDashboard links={data.links} />
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
