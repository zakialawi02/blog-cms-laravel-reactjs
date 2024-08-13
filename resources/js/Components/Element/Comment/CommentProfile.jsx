const CommentProfile = ({ user = null, form = false, comment = false }) => {
    return (
        <div className="flex items-center gap-3 mb-3">
            {user ? (
                <img
                    className="w-8 h-8 rounded-full"
                    src={user.profile_photo_path}
                    alt="profile"
                />
            ) : (
                <img
                    className="w-8 h-8 rounded-full"
                    src="/assets/img/profile/user.png"
                    alt="profile"
                />
            )}
            <span className="text-sm text-gray-700">
                {form && (
                    <>
                        {user ? (
                            <>
                                Comment as <b>{user.username}</b>
                            </>
                        ) : (
                            <b>Please login to comment</b>
                        )}
                    </>
                )}

                {comment && (
                    <>
                        <div className="flex flex-col ml-4">
                            <h3 className="font-bold">
                                {user?.username}{" "}
                                <span className="text-[11px]">
                                    {comment?.is_author ? "(Author)" : ""}
                                </span>
                                {user?.role === "admin" && (
                                    <span className="ml-1 px-1 text-[11px] font-semibold bg-red-500  rounded">
                                        {" "}
                                        Admin
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm">
                                {new Date(
                                    comment.created_at
                                ).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                })}
                            </p>
                        </div>
                    </>
                )}
            </span>
        </div>
    );
};

export default CommentProfile;
