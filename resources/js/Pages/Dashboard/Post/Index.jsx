import Card from "@/Components/Element/Card/Card";
import TextInput from "@/Components/Element/Input/TextInput";
import Pagination from "@/Components/Element/Pagination/Pagination";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router } from "@inertiajs/react";

const Index = ({ auth, posts, meta, queryParams = null }) => {
    queryParams = queryParams || {};
    console.log(posts);

    const onKeyPress = (name, e) => {
        if (e.key === "Enter") {
            searchFieldChanged(name, e.target.value);
        }
    };

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("admin.posts.index"), queryParams);
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
        router.get(route("admin.posts.index"), queryParams);
    };

    return (
        <>
            <Head title={meta.title}></Head>

            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <Card>
                    <div className="overflow-x-auto">
                        <div className="flex justify-end py-2">
                            <Link
                                href={route("admin.posts.create")}
                                className="px-4 py-2 rounded bg-backend-primary text-backend-base-100 hover:bg-backend-primary/80"
                            >
                                Add Post
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

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right">
                                <thead className="text-xs uppercase border-b border-gray-700">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            name="title"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Title
                                        </TableHeading>

                                        <TableHeading
                                            name="category_id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Category
                                        </TableHeading>

                                        <th className="px-3 py-3">Tags</th>

                                        <TableHeading
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Status
                                        </TableHeading>

                                        <th className="px-3 py-3"></th>

                                        <TableHeading
                                            name="user_id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Author
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
                                    {posts.data.map((post) => (
                                        <tr className="border-b" key={post.id}>
                                            <td className="px-3 py-2">
                                                {post.title}
                                            </td>
                                            <td className="px-3 py-2">
                                                {post.category.category}
                                            </td>
                                            <td className="px-3 py-2">
                                                {post.tags.map(
                                                    (tag, index) =>
                                                        `${
                                                            index > 0
                                                                ? ", "
                                                                : ""
                                                        } ${tag.tag_name}`
                                                )}
                                            </td>
                                            <td className="px-3 py-2 w-28">
                                                {post.status} <br />
                                                {new Date(
                                                    post.published_at
                                                ).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <i className="ri-eye-fill"> </i>
                                                {post.total_views}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {post.user.username}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {new Date(
                                                    post.created_at
                                                ).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="text-nowrap">
                                                <Link
                                                    href={route(
                                                        "admin.posts.edit",
                                                        post.slug
                                                    )}
                                                    className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-primary dark:bg-blue-500"
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteProject(post)
                                                    }
                                                    className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-error dark:bg-red-500"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination links={posts.links} />
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
