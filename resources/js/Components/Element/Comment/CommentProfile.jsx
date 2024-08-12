const CommentProfile = ({ user = null }) => {
    return (
        <div className="flex items-center gap-4 mb-3">
            <img className="w-8 h-8 rounded-full" src="#" alt="profile" />
            <span className="text-sm text-gray-700">
                {user ? (
                    <>
                        Comment as <b>[username]</b>
                    </>
                ) : (
                    <b>Please login to comment</b>
                )}
            </span>
        </div>
    );
};

export default CommentProfile;
