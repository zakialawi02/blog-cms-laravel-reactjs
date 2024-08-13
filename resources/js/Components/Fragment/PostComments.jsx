import { useState } from "react";
import ButtonFE from "../Element/Button/ButtonFE";
import CommentForm from "../Element/Comment/CommentForm";
import CommentList from "../Element/Comment/CommentList";
import SkeletonCard from "../Element/Skeleton/SkeletonCard";
import getCommentsPost from "@/Services/getCommentsPost";

const PostComments = () => {
    const pathname = window.location.pathname;
    const slug = pathname.split("/")[3];
    const [showComments, setShowComments] = useState(false);
    const [loadingComment, setLoadingComment] = useState(true);
    const [comments, setComments] = useState([]);

    const showCommentClick = () => {
        setShowComments(true);
        setLoadingComment(true);
        getCommentsPost(slug, setLoadingComment, setComments);
    };

    const refreshComments = () => {
        setLoadingComment(true);
        getCommentsPost(slug, setLoadingComment, setComments);
    };

    return (
        <>
            <div id="comments" className="mt-4">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold">Comments</h2>
                </div>

                <CommentForm refreshComments={refreshComments} />

                {!showComments && (
                    <ButtonFE
                        color="bg-frontend-primary"
                        className="my-4"
                        onClick={showCommentClick}
                    >
                        Show Comments
                    </ButtonFE>
                )}

                {loadingComment && showComments && (
                    <>
                        <SkeletonCard className="mb-4 shadow-none bg-frontend-neutral bg-opacity-30" />
                        <SkeletonCard className="shadow-none bg-frontend-neutral bg-opacity-30" />
                    </>
                )}

                {!loadingComment && showComments && (
                    <div id="comment-list">
                        <CommentList
                            comments={comments}
                            refreshComments={refreshComments}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default PostComments;
