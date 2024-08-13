import { useForm, usePage } from "@inertiajs/react";
import ButtonFE from "../Button/ButtonFE";
import CommentProfile from "./CommentProfile";
import InputError from "../Input/InputError";
import axios from "axios";
import { useState } from "react";

const CommentForm = ({ parentCommentId = null, refreshComments }) => {
    const pathname = window.location.pathname;
    const slug = pathname.split("/")[3];

    const { auth } = usePage().props;
    const { data, setData, errors, setError, clearErrors, reset } = useForm({
        parent_id: parentCommentId ? `comment_0212${parentCommentId}` : "",
        comment: "",
    });
    const [commentSuccess, setCommentSuccess] = useState("");

    const submitComment = (e) => {
        e.preventDefault();
        clearErrors();
        setCommentSuccess("");
        axios
            .post(route("admin.comment.store", slug), data)
            .then((res) => {
                if (res.status === 200 || 201) {
                    setCommentSuccess(`${res.data.message}`);
                    reset();
                    if (refreshComments) {
                        refreshComments();
                    }
                }
            })
            .catch((error) => {
                console.error(error);
                setError("comment", error.response.data.message);
            });
    };

    return (
        <>
            <form
                onSubmit={submitComment}
                className="mt-2 mb-2 space-y-4 comment-form"
            >
                <CommentProfile user={auth.user} form />

                <input
                    type="hidden"
                    name="parent_id"
                    id="parentTarget"
                    value={data.parent_id}
                />

                <div className="space-y-2">
                    <textarea
                        name="comment"
                        id="comment_input"
                        cols="10"
                        rows="5"
                        className="w-full p-2 border-2 rounded-lg border-frontend-neutral"
                        placeholder="Write your comment..."
                        value={data.comment}
                        onChange={(e) => setData("comment", e.target.value)}
                    ></textarea>

                    {commentSuccess && (
                        <div className="mt-2 text-sm font-medium text-green-600">
                            {commentSuccess}
                        </div>
                    )}
                    <InputError message={errors.comment} className="my-1" />
                </div>

                <div className="flex justify-end">
                    {auth.user ? (
                        <ButtonFE type="submit" id="btn-submit-comment">
                            {parentCommentId
                                ? "Post Reply Comment"
                                : "Post Comment"}
                        </ButtonFE>
                    ) : (
                        <ButtonFE
                            type="button"
                            id="btn-submit-comment-need-login"
                            color="bg-frontend-primary"
                            icon="ri-lock-2-line"
                        >
                            Login
                        </ButtonFE>
                    )}
                </div>
            </form>
        </>
    );
};

export default CommentForm;
