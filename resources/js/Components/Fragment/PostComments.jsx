import CommentForm from "../Element/Comment/CommentForm";
import CommentReply from "../Element/Comment/CommentReply";

const PostComments = () => {
    const pathname = window.location.pathname;
    const slug = pathname.split("/")[2];

    return (
        <>
            <CommentReply />

            <CommentForm slug={slug} />
        </>
    );
};

export default PostComments;
