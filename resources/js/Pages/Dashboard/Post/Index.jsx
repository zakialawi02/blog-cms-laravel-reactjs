import Card from "@/Components/Element/Card/Card";
import TextInput from "@/Components/Element/Input/TextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router } from "@inertiajs/react";

const Index = ({ auth, post, meta, queryParams = null }) => {
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
        router.get(route("admin.categories.index"), queryParams);
    };

    return (
        <>
            <Head title={meta.title}></Head>

            <DashboardLayout user={auth.user}>
                <h2>h2 Index</h2>
                <Card>
                    <div className="overflow-x-auto">
                        <div className="py-2 flex justify-end">
                            <Link
                                href={route("admin.posts.create")}
                                className="px-4 py-2 bg-backend-primary text-backend-base-100 rounded hover:bg-backend-primary/80"
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
                        <h2>h2 Index</h2>
                    </div>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
