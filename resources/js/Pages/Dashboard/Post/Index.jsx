import Card from "@/Components/Element/Card/Card";
import InputLabel from "@/Components/Element/Input/InputLabel";
import SelectInput from "@/Components/Element/Input/SelectInput";
import TextInput from "@/Components/Element/Input/TextInput";
import PaginationDashboard from "@/Components/Element/Pagination/PaginationDashboard";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router } from "@inertiajs/react";

const Index = ({
    auth,
    posts,
    meta,
    categories,
    users,
    queryParams = null,
}) => {
    queryParams = queryParams || {};

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

    const filterChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("admin.posts.index"), queryParams);
    };

    const handleDeletePost = (post) => {
        if (confirm("Are you sure you want to delete this post?")) {
            router.delete(route("admin.posts.destroy", post));
        }
    };

    return (
        <>
            <Head title={meta.title}></Head>

            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <Card>
                    <div className="">
                        <div className="inline-flex items-center text-xl font-bold">
                            <h3>Posts</h3>
                            <a
                                href={route("article.index")}
                                className="ml-1 text-backend-primary hover:text-backend-secondary"
                                target="_blank"
                            >
                                <i className="ri-external-link-line"></i>
                            </a>
                        </div>

                        <div className="flex justify-end py-2">
                            <Link
                                href={route("admin.posts.create")}
                                className="px-4 py-2 rounded bg-backend-primary text-backend-base-100 hover:bg-backend-primary/80"
                            >
                                Add Post
                            </Link>
                        </div>

                        <InputLabel>Filter</InputLabel>
                        <div className="flex flex-col mb-4 md:flex-row">
                            <div className="mr-2">
                                <label
                                    htmlFor="status"
                                    className="block w-full md:w-auto"
                                >
                                    Status
                                </label>
                                <SelectInput
                                    name="status"
                                    id="publish"
                                    value={queryParams.status || "all"}
                                    onChange={(e) =>
                                        filterChanged("status", e.target.value)
                                    }
                                >
                                    <option value="all">All</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </SelectInput>
                            </div>
                            <div className="mr-2">
                                <label
                                    htmlFor="category"
                                    className="block w-full md:w-auto"
                                >
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    className="block w-full md:w-auto rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-backend-primary sm:max-w-xs sm:text-sm sm:leading-6"
                                    value={queryParams.category || "all"}
                                    onChange={(e) =>
                                        filterChanged(
                                            "category",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="all">All</option>
                                    <option value="uncategorized">
                                        Uncategorized
                                    </option>
                                    {categories.map((category, index) => (
                                        <option
                                            key={index}
                                            value={category.slug}
                                        >
                                            {category.category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mr-2">
                                <label
                                    htmlFor="user"
                                    className="block w-full md:w-auto"
                                >
                                    Author
                                </label>
                                <select
                                    name="user"
                                    id="user"
                                    className="block w-full md:w-auto rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-backend-primary sm:max-w-xs sm:text-sm sm:leading-6"
                                    value={queryParams.user || "all"}
                                    onChange={(e) =>
                                        filterChanged("user", e.target.value)
                                    }
                                >
                                    <option value="all">All</option>
                                    {users.map((user, index) => (
                                        <option
                                            key={index}
                                            value={user.username}
                                        >
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                            <table className="w-full text-sm text-left">
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
                                    {posts.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="p-6 m-1 text-base font-medium text-center"
                                            >
                                                No data
                                            </td>
                                        </tr>
                                    ) : (
                                        <>
                                            {posts.data.map((post) => (
                                                <tr
                                                    className="border-b"
                                                    key={post.id}
                                                >
                                                    <td className="px-3 py-2 min-w-60">
                                                        {post.title}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {post?.category
                                                            ?.category ||
                                                            "uncategory"}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {post.tags.map(
                                                            (tag, index) =>
                                                                `${
                                                                    index > 0
                                                                        ? ", "
                                                                        : ""
                                                                } ${
                                                                    tag.tag_name
                                                                }`
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 min-w-28">
                                                        {post.status ===
                                                        "published" ? (
                                                            <>
                                                                {new Date(
                                                                    post.published_at
                                                                ) < new Date()
                                                                    ? "Published"
                                                                    : "Scheduled"}
                                                                <br />
                                                                {Intl.DateTimeFormat(
                                                                    "id-ID",
                                                                    {
                                                                        dateStyle:
                                                                            "medium",
                                                                    }
                                                                ).format(
                                                                    new Date(
                                                                        post.published_at
                                                                    )
                                                                )}
                                                            </>
                                                        ) : (
                                                            post.status
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-nowrap">
                                                        <i className="ri-eye-fill">
                                                            {" "}
                                                        </i>
                                                        {post.total_views}
                                                    </td>
                                                    <td className="px-3 py-2 text-nowrap">
                                                        {post.user.username}
                                                    </td>
                                                    <td className="px-3 py-2 text-nowrap">
                                                        {new Date(
                                                            post.created_at
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
                                                        <Link
                                                            href={route(
                                                                "article.showPreview",
                                                                post.slug
                                                            )}
                                                            className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-info"
                                                        >
                                                            <i className="ri-eye-fill"></i>
                                                        </Link>
                                                        {post.published_at && (
                                                            <Link
                                                                href={route(
                                                                    "article.show",
                                                                    {
                                                                        year: post.published_at.substring(
                                                                            0,
                                                                            4
                                                                        ),
                                                                        slug: post.slug,
                                                                    }
                                                                )}
                                                                className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-muted"
                                                            >
                                                                <i className="ri-computer-fill"></i>
                                                            </Link>
                                                        )}

                                                        <Link
                                                            href={route(
                                                                "admin.posts.edit",
                                                                post.slug
                                                            )}
                                                            target="_blank"
                                                            className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-primary"
                                                        >
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                        <button
                                                            onClick={(e) =>
                                                                handleDeletePost(
                                                                    post
                                                                )
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
                    </div>
                    <PaginationDashboard links={posts.links} />
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
