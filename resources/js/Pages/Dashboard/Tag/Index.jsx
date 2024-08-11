import Card from "@/Components/Element/Card/Card";
import TextInput from "@/Components/Element/Input/TextInput";
import PaginationDashboard from "@/Components/Element/Pagination/PaginationDashboard";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router } from "@inertiajs/react";

const Index = ({ auth, tags, meta, queryParams = null }) => {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("admin.tags.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key === "Enter") {
            searchFieldChanged(name, e.target.value);
        }
    };

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
        router.get(route("admin.tags.index"), queryParams);
    };

    const deleteProject = (tag) => {
        if (!window.confirm("Are you sure you want to delete the tag?")) {
            return;
        }
        router.delete(route("admin.tags.destroy", tag.slug), queryParams);
    };

    return (
        <>
            <Head title={meta.title}></Head>

            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <Card>
                    <div className="overflow-x-auto">
                        <div className="flex justify-end py-2">
                            <Link
                                href={route("admin.tags.create")}
                                className="px-4 py-2 rounded bg-backend-primary text-backend-base-100 hover:bg-backend-primary/80"
                            >
                                New Tag
                            </Link>
                        </div>

                        <div className="mb-4">
                            <TextInput
                                className="w-full"
                                defaultValue={queryParams.search}
                                placeholder="Search..."
                                onBlur={(e) =>
                                    searchFieldChanged("search", e.target.value)
                                }
                                onKeyPress={(e) => onKeyPress("search", e)}
                            />
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase border-b border-gray-700">
                                <tr className="text-nowrap">
                                    <TableHeading
                                        name="tag_name"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                    >
                                        Tag
                                    </TableHeading>

                                    <TableHeading
                                        name="slug"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                    >
                                        Slug
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

                                    <th className="w-40 px-3 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tags.data.map((tag) => (
                                    <tr className="border-b" key={tag.id}>
                                        <td className="px-3 py-2">
                                            {tag.tag_name}
                                        </td>
                                        <td className="px-3 py-2">
                                            <Link
                                                href={`/blog/${tag.slug}`}
                                                className="text-backend-accent hover:underline"
                                            >
                                                <i className="mr-2 fa-solid fa-external-link"></i>
                                                {tag.slug}
                                            </Link>
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">
                                            {new Date(
                                                tag.created_at
                                            ).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">
                                            <Link
                                                href={route(
                                                    "admin.tags.edit",
                                                    tag.slug
                                                )}
                                                className="mx-1 font-medium text-backend-primary dark:text-blue-500 hover:underline"
                                            >
                                                <i className="mr-2 fa-solid fa-pen-to-square"></i>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={(e) =>
                                                    deleteProject(tag)
                                                }
                                                className="mx-1 font-medium text-backend-error dark:text-red-500 hover:underline"
                                            >
                                                <i className="mr-2 fa-solid fa-trash"></i>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <PaginationDashboard links={tags.links} />
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
