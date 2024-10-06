import Card from "@/Components/Element/Card/Card";
import TextInput from "@/Components/Element/Input/TextInput";
import PaginationDashboard from "@/Components/Element/Pagination/PaginationDashboard";
import TableHeading from "@/Components/Element/Table/TableHeading";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router } from "@inertiajs/react";

const Index = ({ auth, users, meta, queryParams = null }) => {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("admin.requestContributor.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
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
        router.get(route("admin.requestContributor.index"), queryParams);
    };

    const sendCode = (item) => {
        router.post(route("admin.requestContributor.sendCode", item), {
            onSuccess: () => {
                router.reload();
            },
        });
    };

    const deleteItem = (item) => {
        if (!window.confirm("Are you sure you want to delete the data?")) {
            return;
        }
        router.delete(route("admin.requestContributor.destroy", item));
    };

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex, nofollow" />
            </Head>

            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <Card>
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
                                        name="user_id"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                        sortable={false}
                                    >
                                        User
                                    </TableHeading>

                                    <TableHeading
                                        name="email"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                        sortable={false}
                                    >
                                        Email
                                    </TableHeading>

                                    <TableHeading
                                        name="code"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                        sortable={false}
                                    >
                                        Code
                                    </TableHeading>

                                    <TableHeading
                                        name="created_at"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                    >
                                        Request Date
                                    </TableHeading>

                                    <TableHeading
                                        name="valid_code_until"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                    >
                                        Valid
                                    </TableHeading>

                                    <TableHeading
                                        name="is_confirmed"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={
                                            queryParams.sort_direction
                                        }
                                        sortChanged={sortChanged}
                                        sortable={false}
                                    >
                                        is confirmed
                                    </TableHeading>

                                    <th className="w-40 px-3 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="p-6 m-1 text-base font-medium text-center"
                                        >
                                            No data
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {users.data.map((item) => (
                                            <tr
                                                className="border-b"
                                                key={item.id}
                                            >
                                                <td className="px-3 py-2 min-w-60">
                                                    {item.user.username}
                                                </td>
                                                <td className="px-3 py-2 min-w-60">
                                                    {item.user.email}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap min-w-20">
                                                    {item.code}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap min-w-20">
                                                    {new Date(
                                                        item.created_at
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                        }
                                                    )}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap min-w-20">
                                                    {new Date(
                                                        item.valid_code_until
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                        }
                                                    )}
                                                </td>
                                                <td className="px-3 py-2 text-center text-nowrap min-w-10">
                                                    {item.is_confirmed ==
                                                    true ? (
                                                        <i className="fa-solid fa-check"></i>
                                                    ) : (
                                                        <i className="fa-solid fa-xmark"></i>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {item.is_confirmed ==
                                                    true ? null : (
                                                        <button
                                                            onClick={(e) =>
                                                                sendCode(item)
                                                            }
                                                            className="mx-1 font-medium text-backend-primary hover:underline"
                                                        >
                                                            <i className="mr-2 ri-mail-send-fill"></i>
                                                            {item.is_sent
                                                                ? "send again"
                                                                : "Send code"}
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={(e) =>
                                                            deleteItem(item)
                                                        }
                                                        className="mx-1 font-medium text-backend-error dark:text-red-500 hover:underline"
                                                    >
                                                        <i className="mr-2 fa-solid fa-trash"></i>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <PaginationDashboard links={users.links} />
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
