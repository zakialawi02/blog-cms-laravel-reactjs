import ButtonBE from "@/Components/Element/Button/ButtonBE";
import Card from "@/Components/Element/Card/Card";
import InputError from "@/Components/Element/Input/InputError";
import InputLabel from "@/Components/Element/Input/InputLabel";
import TextInput from "@/Components/Element/Input/TextInput";
import ArticlePost from "@/Components/Element/WYSWYG/articlePost";
import usePreventNavigation from "@/Hook/usePreventNavigation";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { WithContext as ReactTags, KEYS } from "react-tag-input";
import "../../../../css/createPost.css";
import SelectInput from "@/Components/Element/Input/SelectInput";
import { Transition } from "@headlessui/react";
import useDateTime from "@/Hook/useDateTime";

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
    const [metaTab, setMetaTab] = useState(false);
    const [editSlug, setEditSlug] = useState(false);
    const [fillSlug, setFillSlug] = useState(postData ? false : true);
    const [tags, setTags] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const { currentDateTime, formatDateForInput } = useDateTime();
    const { data, setData, errors, setError, post } = useForm({
        cover: postData?.cover ?? null,
        title: postData?.title ?? "",
        slug: postData?.slug ?? "",
        excerpt: postData?.excerpt ?? "",
        content: postData?.content ?? "",
        category_id: postData?.category_id ?? "",
        tags: articleTags ?? [],
        published_at: formatDateForInput(postData?.published_at) ?? "",
        user_id: postData?.user_id ?? auth.user.id,
        meta_title: postData?.meta_title ?? "",
        meta_description: postData?.meta_description ?? "",
        meta_keywords: postData?.meta_keywords ?? "",
    });

    const handleMetaTab = (e) => {
        if (e.target.id === "meta-tab") {
            setMetaTab(true);
        } else {
            setMetaTab(false);
        }
    };

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
        setProcessing(true);
        setRecentlySuccessful(false);
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
                        preserveScroll: true,
                        preserveState: true,
                        onSuccess: () => {
                            router.reload();
                            setProcessing(false);
                            setRecentlySuccessful(true);
                        },
                        onError: (error) => {
                            setError(error);
                            setProcessing(false);
                        },
                    }
                );
            } else {
                post(route("admin.posts.store", { status: "unpublished" }), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        router.visit(route("admin.posts.edit", data.slug));
                        setProcessing(false);
                        setRecentlySuccessful(true);
                    },
                    onError: (error) => {
                        setError(error);
                        setProcessing(false);
                    },
                });
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
                        preserveScroll: true,
                        preserveState: true,
                        onSuccess: () => {
                            router.reload();
                            setProcessing(false);
                            setRecentlySuccessful(true);
                        },
                        onError: (error) => {
                            setError(error);
                            setProcessing(false);
                        },
                    }
                );
            } else {
                post(route("admin.posts.store", { status: "published" }), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        router.visit(route("admin.posts.edit", data.slug));
                        setProcessing(false);
                        setRecentlySuccessful(true);
                    },
                    onError: (error) => {
                        setError(error);
                        setProcessing(false);
                    },
                });
            }
        }
    };

    useEffect(() => {
        if (!postData?.published_at) {
            setData("published_at", currentDateTime);
        }

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

        setImagePreview(
            postData?.cover
                ? `/storage/drive/${postData.user.username}/img/${postData.cover}`
                : null
        );
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setRecentlySuccessful(false);
        }, 5000);
    }, [recentlySuccessful]);

    return (
        <>
            <Head title={meta.title} />

            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <form onChange={(e) => setIsFormChanged(true)}>
                    <div className="flex flex-col items-start gap-2 mb-3 md:items-center md:flex-row md:justify-between">
                        <div className="">
                            <ButtonBE
                                type="button"
                                color="bg-backend-muted/75"
                                disabled={processing}
                                onClick={(e) => {
                                    router.get(route("admin.posts.index"));
                                }}
                            >
                                <i className="ri-arrow-left-line"></i> Back
                            </ButtonBE>
                        </div>
                        <div className="space-x-2">
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
                    </div>

                    <Transition
                        className="float-right"
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>

                    <div>
                        <div className="mt-6 mb-4 sm:block">
                            <div className="border-b border-gray-200">
                                <nav
                                    className="flex gap-6 -mb-px"
                                    aria-label="Tabs"
                                >
                                    <button
                                        type="button"
                                        id="basic-tab"
                                        className={`px-1 pb-2 text-sm font-medium border-b-2 shrink-0 ${
                                            !metaTab
                                                ? "border-sky-500 text-sky-600"
                                                : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                        onClick={handleMetaTab}
                                    >
                                        Basic
                                    </button>
                                    <button
                                        type="button"
                                        id="meta-tab"
                                        className={`px-1 pb-2 text-sm font-medium border-b-2 shrink-0 ${
                                            metaTab
                                                ? "border-sky-500 text-sky-600"
                                                : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                        onClick={handleMetaTab}
                                    >
                                        Meta Data
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>

                    {!metaTab && (
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
                                    <SelectInput
                                        id="category_id"
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
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
                                    </SelectInput>
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
                                        onChange={(e) =>
                                            setData("excerpt", e.target.value)
                                        }
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
                                        autofocus={false}
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
                                            setData(
                                                "published_at",
                                                e.target.value
                                            )
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
                                    <SelectInput
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
                                    </SelectInput>
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
                                                className={`ri-image-fill text-3xl ${
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
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                    />
                                                </label>
                                                <p className="pl-1">
                                                    or drag and drop
                                                </p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">
                                                PNG, JPG, GIF up to 2MB
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
                                                    className="object-cover w-full h-40 rounded-md max-w-80 max-h-72"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Card>
                        </div>
                    )}

                    {metaTab && (
                        <Card className="mb-3">
                            <div className="mb-3">
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="meta_title"
                                        value="Meta Title"
                                    />
                                    <span className="text-sm text-gray-500">
                                        Use meta title for customing title on
                                        browser tab
                                    </span>
                                </div>
                                <TextInput
                                    type="text"
                                    id="meta_title"
                                    className="w-full"
                                    maxLength={255}
                                    value={data.meta_title}
                                    onChange={(e) => {
                                        setData("meta_title", e.target.value);
                                    }}
                                />
                                <InputError
                                    message={errors.meta_title}
                                    className="mb-3"
                                />
                            </div>
                            <div className="mb-3">
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="meta_description"
                                        value="Description"
                                    />
                                    <span className="text-sm text-gray-500">
                                        Use summary for custom description SEO
                                    </span>
                                </div>
                                <textarea
                                    id="meta_description"
                                    name="meta_description"
                                    rows="5"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Enter description"
                                    maxLength={300}
                                    value={data.meta_description}
                                    onChange={(e) => {
                                        setData(
                                            "meta_description",
                                            e.target.value
                                        );
                                    }}
                                ></textarea>
                                <InputError
                                    message={errors.meta_description}
                                    className="mb-3"
                                />
                            </div>
                            <div className="mb-3">
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="meta_keywords"
                                        value="Keywords"
                                    />
                                    <span className="text-sm text-gray-500">
                                        Use keywords for custom description SEO
                                    </span>
                                </div>
                                <textarea
                                    id="meta_keywords"
                                    name="meta_keywords"
                                    rows="5"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Enter keywords. Use comma to separate. Example: keyword1, keyword2, keyword3"
                                    maxLength={255}
                                    value={data.meta_keywords}
                                    onChange={(e) => {
                                        setData(
                                            "meta_keywords",
                                            e.target.value
                                        );
                                    }}
                                ></textarea>
                                <InputError
                                    message={errors.meta_keywords}
                                    className="mb-3"
                                />
                            </div>
                        </Card>
                    )}

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
