import Card from "@/Components/Element/Card/Card";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";

const EmptyPage = ({ auth, meta, pages, queryParams = null }) => {
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
        router.get(route("admin.pages.index"), queryParams);
    };

    const deletePage = (data) => {
        if (!window.confirm("Are you sure you want to delete page?")) {
            return;
        }
        router.delete(route("admin.pages.destroy", data.id), queryParams);
    };

    return (
        <>
            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <Card>
                    <div className="flex justify-end py-2">
                        <Link
                            href={route("admin.pages.create")}
                            className="px-4 py-2 rounded bg-backend-primary text-backend-base-100 hover:bg-backend-primary/80"
                        >
                            Add new page
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase border-b border-gray-700">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-3">#</th>

                                    <TableHeading
                                        name="title"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                    >
                                        Page
                                    </TableHeading>

                                    <TableHeading
                                        name="description"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                    >
                                        Description
                                    </TableHeading>

                                    <TableHeading
                                        name="slug"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                    >
                                        URL
                                    </TableHeading>

                                    <th className="w-40 px-3 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="p-6 m-1 text-base font-medium text-center"
                                        >
                                            No data
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {pages.data.map((item, index) => (
                                            <tr
                                                className="border-b"
                                                key={item.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {index + 1}
                                                </td>
                                                <td className="px-3 py-2 min-w-72">
                                                    {item.title}
                                                </td>
                                                <td className="px-3 py-2 min-w-72">
                                                    {item.description}
                                                </td>
                                                <td className="px-3 py-2 min-w-60">
                                                    <Link
                                                        href={`/blog/${item.slug}`}
                                                        className="text-backend-accent hover:underline"
                                                    >
                                                        <i className="mr-2 fa-solid fa-external-link"></i>
                                                        {item.slug}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <a
                                                        href={route(
                                                            "admin.pages.builder",
                                                            item.id
                                                        )}
                                                        className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-primary"
                                                    >
                                                        <i className="ri-pencil-ruler-2-line"></i>
                                                    </a>
                                                    <a
                                                        href={route(
                                                            "page.show",
                                                            item.slug
                                                        )}
                                                        target="_blank"
                                                        className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-secondary"
                                                    >
                                                        <i className="ri-computer-line"></i>
                                                    </a>
                                                    <Link
                                                        href={route(
                                                            "admin.pages.edit",
                                                            item.id
                                                        )}
                                                        className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-muted"
                                                    >
                                                        <i className="ri-settings-4-line"></i>
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deletePage(item)
                                                        }
                                                        className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-error"
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
                </Card>
            </DashboardLayout>
        </>
    );
};

export default EmptyPage;
