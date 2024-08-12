import { useForm, usePage } from "@inertiajs/react";
import ButtonFE from "../Button/ButtonFE";
import CommentProfile from "./CommentProfile";
import InputError from "../Input/InputError";
import CommentReply from "./CommentReply";
import axios from "axios";
import { useState } from "react";

const CommentForm = ({ slug }) => {
    const { auth } = usePage().props;
    const { data, setData, errors, setError, clearErrors, reset } = useForm({
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
                console.log(res);

                if (res.status === 200 || 201) {
                    setCommentSuccess(`${res.data.message}`);
                    reset();
                }
            })
            .catch((error) => {
                console.log(error);
                setError("comment", error.response.data.message);
            });
    };

    return (
        <>
            <form
                onSubmit={submitComment}
                id="comment-form"
                className="space-y-4"
            >
                <CommentProfile user={auth.user} />

                <CommentReply hidden={true} />

                <input type="hidden" name="parent_id" id="parentTarget" />

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
                        <div className="mt-2 font-medium text-sm text-green-600">
                            {commentSuccess}
                        </div>
                    )}
                    <InputError message={errors.comment} className="my-1" />
                </div>

                <div className="flex justify-end">
                    {auth.user ? (
                        <ButtonFE type="submit" id="btn-submit-comment">
                            Post Comment
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
