import Card from "@/Components/Element/Card/Card";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router } from "@inertiajs/react";

const MyComment = ({ auth, meta, comments, queryParams = null }) => {
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
        router.get(route("admin.mycomments.index"), queryParams);
    };

    const deleteComment = (comment) => {
        if (!window.confirm("Are you sure you want to delete the comment?")) {
            return;
        }
        router.delete(route("admin.comment.destroy", comment.id), queryParams);
    };

    return (
        <>
            <Head title="Index"></Head>

            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="border-b border-gray-700">
                                <tr className="text-nowrap">
                                    <th>#</th>

                                    <TableHeading
                                        name="content"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                    >
                                        Comment
                                    </TableHeading>

                                    <TableHeading
                                        name="article_id"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                    >
                                        Post
                                    </TableHeading>

                                    <TableHeading
                                        name="created_at"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                    >
                                        Date
                                    </TableHeading>

                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.data.length > 0 ? (
                                    comments.data.map((comment, index) => (
                                        <tr className="border-b" key={index}>
                                            <th className="px-3 py-2 pr-2">
                                                {index + 1}
                                            </th>
                                            <td className="px-3 py-2 min-w-72">
                                                {comment.content}
                                            </td>
                                            <td className="px-3 py-2 min-w-60">
                                                {comment.article.title}
                                            </td>
                                            <td className="px-3 py-2 min-w-28">
                                                {new Date(
                                                    comment.created_at
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                    second: "numeric",
                                                })}
                                            </td>
                                            <td className="w-1 px-1 py-2 text-nowrap">
                                                <Link
                                                    href={
                                                        route("article.show", {
                                                            year: comment.article.published_at.substring(
                                                                0,
                                                                4
                                                            ),
                                                            slug: comment
                                                                .article.slug,
                                                        }) +
                                                        "?source=comments&commentId=comment_0212" +
                                                        comment.id
                                                    }
                                                    className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-primary"
                                                    target="_blank"
                                                >
                                                    <i className="ri-eye-fill"></i>
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteComment(comment)
                                                    }
                                                    className="w-8 p-2 ml-1 font-medium rounded-md hover:bg-opacity-70 text-backend-light bg-backend-error"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-6 m-1 text-base font-medium text-center"
                                        >
                                            No Data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default MyComment;
