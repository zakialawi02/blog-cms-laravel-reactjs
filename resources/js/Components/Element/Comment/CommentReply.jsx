const CommentReply = ({ hidden = true }) => {
    return (
        <div className={`${hidden ? "hidden" : ""}`} id="replyToTarget">
            <span>
                <i className="ri-reply-fill"></i> Rely to
                <span id="replyToName"> [replyTo]</span>
                <b>
                    <span id="snapshotComment"> [snapshotPlace]</span>
                </b>
                <button
                    id="cancel_reply"
                    className="ml-2 text-frontend-error hover:text-frontend-accent"
                    type="button"
                >
                    <i className="ri-close-circle-fill"></i>
                </button>
            </span>
        </div>
    );
};

export default CommentReply;
