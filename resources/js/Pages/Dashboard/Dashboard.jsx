import Card from "@/Components/Element/Card/Card";
import SkeletonCard from "@/Components/Element/Skeleton/SkeletonCard";
import DashboardLayout from "@/Layouts/DashboardLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = ({ auth }) => {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        axios
            .get(route("admin.dashboard.getInfo"))
            .then((response) => {
                console.log(response.data);
                setInfo(response.data);
                setLoading(false);
            })
            .catch((response) => {
                console.log(response);
                setInfo({});
            });
    }, []);
    return (
        <>
            <DashboardLayout user={auth.user}>
                <div className="p-1">
                    <h2 className="text-2xl">
                        Welcome {auth.user.name}, @{auth.user.username}
                    </h2>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-2 md:gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <SkeletonCard reapeat="1" />
                        <SkeletonCard reapeat="1" />
                        <SkeletonCard reapeat="1" />
                        <SkeletonCard reapeat="1" />
                        <SkeletonCard reapeat="1" />
                        <SkeletonCard reapeat="1" />
                        <SkeletonCard reapeat="1" />
                        <SkeletonCard reapeat="1" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-2 md:gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="">
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <h4 className="mb-0 text-lg">
                                        Total My Posts
                                    </h4>
                                    <p className="text-backend-muted">
                                        {info.myPosts} posts
                                    </p>
                                </div>
                                <div>
                                    <i className="text-5xl ri-archive-stack-fill text-backend-primary" />
                                </div>
                            </div>
                        </Card>
                        <Card className="">
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <h4 className="mb-0 text-lg">
                                        My Posts Published
                                    </h4>
                                    <p className="text-backend-muted">
                                        {info.myPostsPublished} posts
                                    </p>
                                </div>
                                <div>
                                    <i className="text-5xl ri-mac-line text-backend-success" />
                                </div>
                            </div>
                        </Card>
                        <Card className="">
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <h4 className="mb-0 text-lg">
                                        Total My Comments
                                    </h4>
                                    <p className="text-backend-muted">
                                        {info.myComments} comments
                                    </p>
                                </div>
                                <div>
                                    <i className="text-5xl ri-message-2-fill text-backend-muted" />
                                </div>
                            </div>
                        </Card>
                        <Card className="">
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <h4 className="mb-0 text-lg">Visitors</h4>
                                    <p className="text-backend-muted">
                                        {info.visitors} visitors
                                    </p>
                                </div>
                                <div>
                                    <i className="text-5xl ri-bar-chart-grouped-fill text-backend-warning" />
                                </div>
                            </div>
                        </Card>
                        <Card className="">
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <h4 className="mb-0 text-lg">
                                        Total My Posts
                                    </h4>
                                    <p className="text-backend-muted">
                                        {info.allPostsCount} posts
                                    </p>
                                </div>
                                <div>
                                    <i className="text-5xl ri-archive-stack-fill text-backend-muted" />
                                </div>
                            </div>
                        </Card>
                        <Card className="">
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <h4 className="mb-0 text-lg">
                                        All Posts Published
                                    </h4>
                                    <p className="text-backend-muted">
                                        {info.allPostsPublished} posts
                                    </p>
                                </div>
                                <div>
                                    <i className="text-5xl ri-mac-line text-backend-success" />
                                </div>
                            </div>
                        </Card>
                        <Card className="">
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <h4 className="mb-0 text-lg">
                                        Total All Comments
                                    </h4>
                                    <p className="text-backend-muted">
                                        {info.allCommentsCount} comments
                                    </p>
                                </div>
                                <div>
                                    <i className="text-5xl ri-message-2-fill text-backend-secondary" />
                                </div>
                            </div>
                        </Card>
                        <Card className="">
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <h4 className="mb-0 text-lg">Total User</h4>
                                    <p className="text-backend-muted">
                                        {info.totalUsers} users
                                    </p>
                                </div>
                                <div>
                                    <i className="text-5xl ri-group-fill text-backend-error" />
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                <div className="">
                    <Card className="">
                        <div className="mb-3">
                            <h4 className="mb-0 text-2xl">Coming Soon</h4>
                        </div>
                        <p>Coming Soon new features</p>
                    </Card>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Dashboard;
