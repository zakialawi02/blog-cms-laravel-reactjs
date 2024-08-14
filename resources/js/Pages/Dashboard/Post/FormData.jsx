import ButtonBE from "@/Components/Element/Button/ButtonBE";
import Card from "@/Components/Element/Card/Card";
import InputError from "@/Components/Element/Input/InputError";
import InputLabel from "@/Components/Element/Input/InputLabel";
import TextInput from "@/Components/Element/Input/TextInput";
import ArticlePost from "@/Components/Element/WYSWYG/articlePost";
import usePreventNavigation from "@/Hook/usePreventNavigation";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router, useForm } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { WithContext as ReactTags, KEYS } from "react-tag-input";
import "../../../../css/articlePost.css";

const FormData = ({
    auth,
    meta,
    postData = null,
    articleTags = null,
    categories,
    tagsList,
}) => {
    const [isFormChanged, setIsFormChanged] = useState(false);
    usePreventNavigation(isFormChanged);
    const isUpdate = useRef(postData ? true : false);
    const [editSlug, setEditSlug] = useState(false);
    const [fillSlug, setFillSlug] = useState(postData ? false : true);

    const [tags, setTags] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const { data, setData, errors, setError, post, processing } = useForm({
        cover: postData?.cover ?? null,
        title: postData?.title ?? "",
        slug: postData?.slug ?? "",
        excerpt: postData?.excerpt ?? "",
        content: postData?.content ?? "",
        category_id: postData?.category_id ?? "",
        tags: articleTags ?? [],
        published_at: postData?.published_at ?? "",
        user_id: postData?.user_id ?? auth.user.id,
    });

    const suggestionsTag = tagsList.map((tag) => {
        return {
            id: tag.id.toString(),
            text: tag.tag_name,
        };
    });

    const handleDeleteTag = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
        setData(
            "tags",
            tags.filter((tag, index) => index !== i)
        );
    };

    const handleAdditionTag = (tag) => {
        setTags([...tags, tag]);
        setData("tags", [...tags, tag]);
    };

    const onTagUpdate = (index, newTag) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1, newTag);
        setTags(updatedTags);
    };

    const inputSlug = (e) => {
        setEditSlug(!editSlug);
        if (fillSlug) {
            setFillSlug(!fillSlug);
        }
    };

    const fetchSlug = useCallback(
        debounce(async (text) => {
            try {
                const response = await axios.post(
                    route("admin.posts.generateSlug"),
                    {
                        data: text,
                    }
                );
                setData((prevState) => ({
                    ...prevState,
                    slug: response.data.slug,
                }));
            } catch (error) {
                console.error("Error generating slug", error);
            }
        }, 500),
        []
    );

    const changeToSlug = (e) => {
        const title = e.target.value;
        setData("title", title);

        if (fillSlug) {
            fetchSlug(title);
        }
    };

    const handleChangeContent = (content) => {
        setData("content", content);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        updateImage(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        updateImage(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const updateImage = (file) => {
        setData("cover", file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        if (e.target.name === "unpublished") {
            if (isUpdate.current) {
                router.post(
                    route("admin.posts.update", data.slug),
                    {
                        _method: "put",
                        ...data,
                        status: "unpublished",
                    },
                    {
                        onError: (error) => {
                            setError(error);
                        },
                    }
                );
            } else {
                post(route("admin.posts.store", { status: "unpublished" }));
            }
        } else {
            if (isUpdate.current) {
                router.post(
                    route("admin.posts.update", data.slug),
                    {
                        _method: "put",
                        ...data,
                        status: "published",
                    },
                    {
                        onError: (error) => {
                            setError(error);
                        },
                    }
                );
            } else {
                post(route("admin.posts.store", { status: "published" }));
            }
        }
    };

    useEffect(() => {
        const getCurrentDateTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
            const day = String(now.getDate()).padStart(2, "0");
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");

            return `${year}-${month}-${day}T${hours}:${minutes}`;
        };
        const formatDateForInput = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        };
        if (data.published_at == "") {
            setData("published_at", getCurrentDateTime());
        } else {
            const formattedDate = formatDateForInput(data.published_at);
            setData("published_at", formattedDate);
        }
    }, [data.published_at]);

    useEffect(() => {
        if (articleTags) {
            const updatedTags = articleTags.map((tag) => ({
                id: tag.id.toString(),
                text: tag.text,
            }));
            setTags(updatedTags);
        }
        if (postData?.cover) {
            setData("cover", null);
        }
        console.log(postData);

        setImagePreview(
            postData?.cover
                ? `/storage/drive/${postData.user.username}/img/${postData.cover}`
                : null
        );
    }, []);

    return (
        <>
            <Head title={meta.title} />

            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <form>
                    <div className="flex justify-end gap-2 mb-3">
                        <ButtonBE
                            type="submit"
                            name="published"
                            disabled={processing}
                            onClick={handleSubmit}
                        >
                            {postData
                                ? "Update and Publish"
                                : "Save and Publish"}
                        </ButtonBE>
                        <ButtonBE
                            type="submit"
                            name="unpublished"
                            disabled={processing}
                            color="bg-backend-muted"
                            onClick={handleSubmit}
                        >
                            Save as Draft
                        </ButtonBE>
                    </div>

                    <div className="flex flex-col gap-2 mb-3 lg:flex-row">
                        <Card className="flex-1">
                            <div className="mb-3">
                                <InputLabel
                                    htmlFor="title"
                                    value="Title"
                                    className="mb-2"
                                />
                                <TextInput
                                    type="text"
                                    id="title"
                                    className="w-full"
                                    isFocused={true}
                                    value={data.title}
                                    onChange={changeToSlug}
                                />
                                <InputError
                                    message={errors.title}
                                    className="mb-3"
                                />
                            </div>
                            <div className="mb-3">
                                <InputLabel
                                    htmlFor="category_id"
                                    value="Category"
                                    className="mb-2"
                                />
                                <select
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-backend-primary focus:ring-backend-primary"
                                    id="category_id"
                                    name="category_id"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                >
                                    <option value="">
                                        -- Select Category --
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.category}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={errors.category_id}
                                    className="mb-3"
                                />
                            </div>
                            <div className="mb-3">
                                <InputLabel
                                    htmlFor="excerpt"
                                    value="Excerpt/Summary/Intro"
                                    className="mb-2"
                                />
                                <textarea
                                    id="excerpt"
                                    name="excerpt"
                                    rows="5"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-backend-primary focus:ring-backend-primary"
                                    value={data.excerpt}
                                ></textarea>
                                <InputError
                                    message={errors.excerpt}
                                    className="mb-3"
                                />
                            </div>

                            <div id="tags" className="mb-3">
                                <InputLabel
                                    htmlFor="tags"
                                    value="Tags"
                                    className="mb-2"
                                />
                                <ReactTags
                                    inline={false}
                                    tags={tags}
                                    delimiters={[KEYS.TAB, KEYS.COMMA]}
                                    suggestions={suggestionsTag}
                                    placeholder="Add tags. Press comma to add."
                                    onTagUpdate={onTagUpdate}
                                    handleDelete={handleDeleteTag}
                                    handleAddition={handleAdditionTag}
                                    inputFieldPosition="bottom"
                                    autocomplete
                                    allowDragDrop={false}
                                    maxTags={10}
                                />
                                <InputError
                                    message={errors.tags}
                                    className="mb-3"
                                />
                            </div>
                        </Card>

                        <Card className="w-full lg:w-1/3">
                            <div className="mb-3">
                                <InputLabel
                                    htmlFor="slug"
                                    value="Slug / url post"
                                    className="mb-2"
                                />
                                <div className="relative mt-2.5">
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        <button
                                            type="button"
                                            className="rounded-r-md z-10 bg-backend-neutral border border-l-0 border-gray-300 px-3.5 py-2  shadow-sm ring-1 ring-inset hover:bg-gray-50"
                                            onClick={(e) => inputSlug(e)}
                                        >
                                            {editSlug ? (
                                                <i className="ri-close-line"></i>
                                            ) : (
                                                <i className="ri-pencil-line"></i>
                                            )}
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        id="slug"
                                        typeof="text"
                                        className="block w-full rounded-md border-0 px-3.5 py-2   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-backend-primary sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={data.slug}
                                        disabled={!editSlug}
                                        onChange={(e) =>
                                            setData((prevState) => ({
                                                ...prevState,
                                                slug: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <InputError
                                    message={errors.slug}
                                    className="mb-3"
                                />
                            </div>
                            <div className="mb-3">
                                <InputLabel
                                    htmlFor="published_at"
                                    value="Publish At"
                                />
                                <i>*by default immediately</i>
                                <input
                                    type="datetime-local"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-backend-primary focus:ring-backend-primary"
                                    id="published_at"
                                    name="published_at"
                                    value={data.published_at}
                                    onChange={(e) =>
                                        setData("published_at", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.published_at}
                                    className="mb-3"
                                />
                            </div>

                            {/**  AUTHOR MASIH BELOM BERFUNGSI  **/}
                            <div className="mb-3">
                                <InputLabel
                                    htmlFor="user_id"
                                    value="Author"
                                    className="mb-2"
                                />
                                <select
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-backend-primary focus:ring-backend-primary"
                                    id="user_id"
                                    name="user_id"
                                    value={data.user_id}
                                    onChange={(e) =>
                                        setData("user_id", e.target.value)
                                    }
                                >
                                    <option value="">
                                        -- Select Author --
                                    </option>
                                    <option value={auth.user.id}>
                                        {auth.user.username}
                                    </option>
                                    {/* {users.map((user, index) => (
                                        <option key={index} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))} */}
                                </select>
                                <InputError
                                    message={errors.user_id}
                                    className="mb-3"
                                />
                            </div>

                            <div className="mb-3">
                                <InputLabel
                                    value="Featured Image"
                                    className="mb-2"
                                />
                                <div
                                    className={`flex justify-center p-6 mt-2 border border-dashed rounded-lg ${
                                        dragging
                                            ? "border-backend-info"
                                            : "border-gray-900/25"
                                    }`}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                >
                                    <div className="text-center">
                                        <i
                                            class={`ri-image-fill text-3xl ${
                                                dragging
                                                    ? "text-backend-info"
                                                    : "text-gray-900/25"
                                            }`}
                                        ></i>
                                        <div className="flex mt-4 text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="cover"
                                                className="relative font-semibold rounded-md cursor-pointer text-backend-primary bg-backend-light focus-within:outline-none focus-within:ring-2 focus-within:ring-backend-primary focus-within:ring-offset-2 hover:text-backend-primary"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="cover"
                                                    name="cover"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                            <p className="pl-1">
                                                or drag and drop
                                            </p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                                <InputError
                                    message={errors.cover}
                                    className="mb-3"
                                />

                                {imagePreview && (
                                    <>
                                        <div className="mt-3 space-y-1">
                                            <span>Preview</span>
                                            <img
                                                src={imagePreview}
                                                alt="Preview featured image"
                                                className="w-full h-40 object-cover rounded-md max-w-80 max-h-72"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </Card>
                    </div>

                    <Card className="">
                        <InputLabel value="Content" className="mb-2" />
                        <ArticlePost
                            data={data.content}
                            onChange={handleChangeContent}
                        />
                    </Card>
                </form>
            </DashboardLayout>
        </>
    );
};

export default FormData;
