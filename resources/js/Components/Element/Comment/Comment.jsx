import CommentProfile from "./CommentProfile";
import CommentForm from "./CommentForm";
import { useState } from "react";

const Comment = ({ comment, refreshComments }) => {
    const [showReply, setShowReply] = useState(false);
    const [comSnapshot, setComSnapshot] = useState({
        comContent: "",
        comUsername: "",
    });

    const handleReplyClick = (e) => {
        setShowReply(!showReply);
        const targetElement = document.getElementById(
            `comment_0212${comment.id}`
        );
        if (targetElement) {
            const comContent = targetElement.getAttribute("data-comment");
            const comUsername = targetElement.getAttribute("data-user");
            setComSnapshot({ comContent, comUsername });
        }
    };

    return (
        <div
            className="p-3 mt-3 border-2 rounded-lg border-opacity-70 border-backend-base-100 bg-frontend-neutral bg-opacity-40"
            style={{
                marginLeft: `${comment.level * 4}px`,
            }}
        >
            <div
                id={`comment_0212${comment.id}`}
                data-comment={comment?.content?.substr(0, 10)}
                data-user={comment?.user?.username}
            >
                <CommentProfile user={comment.user} comment={comment} />
                <p>{comment.content}</p>
            </div>

            <div className="mt-3">
                {/* Hanya tampilkan tombol reply jika level kurang dari 3 */}
                {comment.level < 3 && (
                    <>
                        {showReply ? (
                            <span>
                                <i className="ri-reply-fill" /> Reply to{" "}
                                {comSnapshot.comUsername}
                                <b>
                                    {" "}
                                    ({" "}
                                    {comSnapshot.comContent.length > 10
                                        ? `${comSnapshot.comContent.substring(
                                              0,
                                              10
                                          )}...`
                                        : comSnapshot.comContent.substring(
                                              0,
                                              10
                                          )}{" "}
                                    )
                                </b>
                                <button
                                    type="button"
                                    className="ml-2 text-frontend-error hover:text-frontend-accent"
                                    onClick={handleReplyClick}
                                >
                                    <i className="ri-close-circle-fill" />
                                </button>
                            </span>
                        ) : (
                            <button
                                type="button"
                                className="p-2 text-frontend-primary hover:text-frontend-secondary reply_comment"
                                onClick={handleReplyClick}
                            >
                                <i className="ri-reply-fill" /> Reply
                            </button>
                        )}

                        {showReply && (
                            <>
                                <CommentForm
                                    parentCommentId={comment.id}
                                    refreshComments={refreshComments}
                                />
                            </>
                        )}
                    </>
                )}
            </div>

            {comment.replies &&
                comment.replies.map((reply) => (
                    <Comment
                        key={reply.id}
                        comment={reply}
                        refreshComments={refreshComments}
                    />
                ))}
        </div>
    );
};

export default Comment;
