import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Element/Card/Card";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/Element/Input/TextInput";
import InputLabel from "@/Components/Element/Input/InputLabel";
import InputError from "@/Components/Element/Input/InputError";
import ButtonBE from "@/Components/Element/Button/ButtonBE";
import usePreventNavigation from "@/Hook/usePreventNavigation";
import { useEffect, useRef, useState } from "react";

const Create = ({ auth, category = null, meta }) => {
    const [isFormChanged, setIsFormChanged] = useState(false);
    usePreventNavigation(isFormChanged);
    const isUpdate = useRef(category ? true : false);
    const [editSlug, setEditSlug] = useState(false);
    const [fillSlug, setFillSlug] = useState(category ? false : true);

    const { data, setData, errors, post, put, processing } = useForm({
        category: category?.category ?? "",
        slug: category?.slug ?? "",
    });

    const inputSlug = (e) => {
        setEditSlug(!editSlug);
        if (fillSlug) {
            setFillSlug(!fillSlug);
        }
    };

    const generateSlug = async (categoryName) => {
        if (fillSlug) {
            try {
                const response = await axios.post(
                    route("admin.categories.generateSlug"),
                    {
                        category: categoryName,
                    }
                );

                setData("slug", response.data.slug);
            } catch (error) {
                console.error("Error generating slug", error);
            }
        }
    };

    useEffect(() => {
        if (data.category) {
            generateSlug(data.category);
        }
    }, [data.category]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdate.current) {
            put(route("admin.categories.update", category.slug));
        } else {
            post(route("admin.categories.store"));
        }
    };

    return (
        <>
            <Head title={meta.title}></Head>

            <DashboardLayout metaTitle={meta.title} user={auth.user}>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <InputLabel
                                htmlFor="category"
                                value="Category Name"
                                className="mb-2"
                            />
                            <TextInput
                                type="text"
                                id="category"
                                className="w-full"
                                isFocused={true}
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.category}
                                className="mb-3"
                            />
                        </div>

                        <div className="relative mb-4">
                            <InputLabel
                                htmlFor="slug"
                                value="Category Slug / url"
                                className="mb-2"
                            />
                            <div className="absolute right-0 flex items-center">
                                <button
                                    type="button"
                                    className="rounded-r-md bg-backend-neutral border border-l-0 border-gray-300 px-3.5 py-2  shadow-sm ring-1 ring-inset hover:bg-gray-50"
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
                                    setData("slug", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.slug}
                                className="mb-3"
                            />
                        </div>

                        <ButtonBE disabled={processing}>
                            {category ? "Update" : "Create"}
                        </ButtonBE>
                    </form>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Create;
