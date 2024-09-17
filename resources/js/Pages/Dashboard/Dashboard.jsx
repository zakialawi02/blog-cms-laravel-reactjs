import ButtonBE from "@/Components/Element/Button/ButtonBE";
import Card from "@/Components/Element/Card/Card";
import TextInput from "@/Components/Element/Input/TextInput";
import SkeletonCard from "@/Components/Element/Skeleton/SkeletonCard";
import SkeletonOneLine from "@/Components/Element/Skeleton/SkeletonOneLine";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = ({ auth }) => {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [sendJoin, setSendJoin] = useState(false);
    const [message, setMessage] = useState(null);
    const [code, setCode] = useState(null);

    const joinContributors = () => {
        setSendJoin(true);
        setCode(null);
        setMessage(null);
        axios
            .post(route("admin.requestsContributors"))
            .then((response) => {
                if (response.status === 200 || 201) {
                    setMessage(response.data.message);
                    setSendJoin(false);
                    router.reload();
                } else {
                    throw new Error(response);
                }
            })
            .catch((response) => {
                const message = JSON.parse(response?.request?.response).message;
                setMessage(message);
                setSendJoin(false);
                router.reload();
            });
    };

    const confirmCode = () => {
        setSendJoin(true);
        setCode(null);
        setMessage(null);
        axios
            .post(route("admin.confirmCodeContributor"), { code: code })
            .then((response) => {
                if (response.status === 200 || 201) {
                    setMessage(response?.data?.message);
                    setSendJoin(false);
                    location.reload();
                } else {
                    throw new Error(response);
                }
            })
            .catch((response) => {
                const message = JSON.parse(response?.request?.response).message;
                setMessage(message);
                setSendJoin(false);
                router.reload();
            });
    };

    const getInfoDashboard = async () => {
        const res = await axios
            .get(route("admin.dashboard.getInfo"))
            .then((res) => {
                setInfo(res.data);
            })
            .catch((err) => {
                console.error(err);
                setInfo([]);
            });
    };

    const getMetadata = async () => {
        const res = await axios
            .get("/meta-web")
            .then((response) => {
                setMetadata(response.data);
            })
            .catch((error) => {
                console.error(error);
                setMetadata([]);
            });
    };

    const fetchData = async () => {
        getInfoDashboard()
            .then(() => getMetadata())
            .then(() => setLoading(false))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchData();
    }, [message]);

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
                        {auth.user.role == "user" ? (
                            <></>
                        ) : (
                            <>
                                <SkeletonCard reapeat="1" />
                                <SkeletonCard reapeat="1" />
                                <SkeletonCard reapeat="1" />
                                <SkeletonCard reapeat="1" />
                            </>
                        )}

                        {auth.user.role == "admin" && (
                            <>
                                <SkeletonCard reapeat="1" />
                                <SkeletonCard reapeat="1" />
                                <SkeletonCard reapeat="1" />
                                <SkeletonCard reapeat="1" />
                            </>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-2 md:gap-3 md:grid-cols-2 lg:grid-cols-4">
                        {auth.user.role == "user" ? (
                            <></>
                        ) : (
                            <>
                                <Card className="">
                                    <div className="flex items-center justify-between p-2">
                                        <div>
                                            <h4 className="mb-0 text-lg">
                                                My Posts
                                            </h4>
                                            <p className="text-backend-muted">
                                                {info?.myPosts} posts
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
                                                {info?.myPostsPublished} posts
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
                                                My Comments
                                            </h4>
                                            <p className="text-backend-muted">
                                                {info?.myComments} comments
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
                                            <h4 className="mb-0 text-lg">
                                                Visitors
                                            </h4>
                                            <p className="text-backend-muted">
                                                {info?.visitors} visitors
                                            </p>
                                        </div>
                                        <div>
                                            <i className="text-5xl ri-bar-chart-grouped-fill text-backend-warning" />
                                        </div>
                                    </div>
                                </Card>
                            </>
                        )}

                        {auth.user.role == "admin" && (
                            <>
                                <Card className="">
                                    <div className="flex items-center justify-between p-2">
                                        <div>
                                            <h4 className="mb-0 text-lg">
                                                Total All Posts
                                            </h4>
                                            <p className="text-backend-muted">
                                                {info?.allPostsCount} posts
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
                                                {info?.allPostsPublished} posts
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
                                                {info?.allCommentsCount}{" "}
                                                comments
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
                                            <h4 className="mb-0 text-lg">
                                                Total User
                                            </h4>
                                            <p className="text-backend-muted">
                                                {info?.totalUsers} users
                                            </p>
                                        </div>
                                        <div>
                                            <i className="text-5xl ri-group-fill text-backend-error" />
                                        </div>
                                    </div>
                                </Card>
                            </>
                        )}
                    </div>
                )}

                <Card className="">
                    <div className="mb-3">
                        <h4 className="mb-0 text-2xl">My Comments</h4>
                    </div>
                    <p className="mb-4">
                        Total of my comments : {info?.myComments}
                    </p>
                    <Link
                        preserveState
                        href="/dashboard/my-comments"
                        className="text-backend-primary hover:text-backend-secondary"
                    >
                        View My Comments More
                    </Link>
                </Card>

                {auth?.user?.role == "user" && (
                    <>
                        {loading && <SkeletonOneLine height={40} />}

                        {metadata?.can_join_contributor == true && (
                            <>
                                {!loading && (
                                    <>
                                        {(info.join == null ||
                                            new Date(
                                                info.join.valid_code_until
                                            ) < new Date()) && (
                                            <Card className="">
                                                <div className="mb-3">
                                                    <h4 className="mb-0 text-2xl">
                                                        Become a Contributor
                                                    </h4>
                                                </div>
                                                <p>
                                                    Want to be a part of our
                                                    community and contribute as
                                                    a writer? Click the button
                                                    below to join our team!
                                                </p>
                                                {message && (
                                                    <p className="py-2 text-backend-primary">
                                                        {message}
                                                    </p>
                                                )}
                                                <div className="flex justify-center p-2 my-3">
                                                    <ButtonBE
                                                        className=""
                                                        onClick={
                                                            joinContributors
                                                        }
                                                        disabled={sendJoin}
                                                    >
                                                        Join us as a
                                                        contributor/writer
                                                    </ButtonBE>
                                                </div>
                                            </Card>
                                        )}

                                        {info.join !== null &&
                                            new Date(
                                                info.join.valid_code_until
                                            ) > new Date() && (
                                                <>
                                                    <Card className="">
                                                        <div className="mb-3 w-[95%] md:w-[80%] mx-auto text-center">
                                                            <h4 className="mb-0 text-xl">
                                                                Enter your code
                                                                to confirm your
                                                                request to
                                                                become a
                                                                contributor
                                                            </h4>
                                                            <p class="text-muted">
                                                                Owner/Administrator
                                                                will send the
                                                                code request to
                                                                your email{" "}
                                                                {
                                                                    auth.user
                                                                        .email
                                                                }{" "}
                                                                if approved
                                                            </p>
                                                            {message && (
                                                                <p className="py-2 text-backend-primary">
                                                                    {message}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="mb-3 w-[95%] md:w-[80%] mx-auto">
                                                            <TextInput
                                                                type="text"
                                                                id="code"
                                                                name="code"
                                                                className="w-full"
                                                                placeholder="Enter code"
                                                                value={code}
                                                                onChange={(e) =>
                                                                    setCode(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <div className="flex justify-center p-2 my-3">
                                                            <ButtonBE
                                                                className=""
                                                                onClick={
                                                                    confirmCode
                                                                }
                                                                disabled={
                                                                    sendJoin
                                                                }
                                                            >
                                                                Confirm
                                                            </ButtonBE>
                                                        </div>
                                                    </Card>
                                                </>
                                            )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}

                <Card className="">
                    <div className="mb-3">
                        <h4 className="mb-0 text-2xl">Coming Soon</h4>
                    </div>
                    <p>Coming Soon new features</p>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Dashboard;
