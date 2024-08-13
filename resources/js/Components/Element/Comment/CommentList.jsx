import Comment from "./Comment";

const CommentList = ({ comments = [], refreshComments }) => {
    return (
        <div className="mt-10">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        refreshComments={refreshComments}
                    />
                ))
            ) : (
                <div>No comments yet. Be the first to comment!</div>
            )}
        </div>
    );
};

export default CommentList;
