import ButtonBE from "@/Components/Element/Button/ButtonBE";
import Card from "@/Components/Element/Card/Card";
import InputError from "@/Components/Element/Input/InputError";
import InputLabel from "@/Components/Element/Input/InputLabel";
import TextInput from "@/Components/Element/Input/TextInput";
import usePreventNavigation from "@/Hook/usePreventNavigation";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

const FormData = ({ auth, meta, page = null }) => {
    const [isFormChanged, setIsFormChanged] = useState(false);
    usePreventNavigation(isFormChanged);
    const isUpdate = useRef(page ? true : false);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: page?.title ?? "",
        description: page?.description ?? "",
        content: page?.content ?? "",
        slug: page?.slug ?? "",
        template_id: page?.isFullWidth ? parseInt(page?.isFullWidth) : 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        if (isUpdate.current) {
            put(route("admin.pages.update", page.id));
        } else {
            post(route("admin.pages.store"));
        }
    };

    const handleTemplateChange = (e) => {
        // Update template_id based on selected radio button
        setData("template_id", parseInt(e.target.value));
    };

    return (
        <>
            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <Card>
                    <form
                        onChange={(e) => setIsFormChanged(true)}
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3">
                            <div className="mb-3">
                                <InputLabel htmlFor="title" value="Title" />
                            </div>
                            <TextInput
                                type="text"
                                id="title"
                                name="title"
                                className="w-full"
                                maxLength={255}
                                value={data.title}
                                isFocused
                                placeholder="Enter title"
                                required
                                onChange={(e) => {
                                    setData("title", e.target.value);
                                }}
                            />
                            <InputError
                                message={errors.title}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-3">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />
                            </div>
                            <textarea
                                id="description"
                                name="description"
                                rows="5"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Enter description"
                                maxLength={300}
                                value={data.description}
                                onChange={(e) => {
                                    setData("description", e.target.value);
                                }}
                            ></textarea>
                            <InputError
                                message={errors.description}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel
                                htmlFor="slug"
                                value="Slug / url post"
                                className="mb-2"
                            />
                            <div className="relative mt-2.5">
                                <div className="absolute inset-y-0 left-0 flex items-center">
                                    <div className="rounded-l-md z-10 bg-backend-neutral border border-r-0 border-gray-300 px-3.5 py-2 shadow-sm">
                                        https://domain.com/p/
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    id="slug"
                                    typeof="text"
                                    name="slug"
                                    className="block w-full rounded-md border-0 px-3.5 py-2   shadow-sm pl-48 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-backend-primary sm:text-sm sm:leading-6"
                                    value={data.slug}
                                    placeholder="enter-slug-here"
                                    required
                                    onChange={(e) => {
                                        setData("slug", e.target.value);
                                    }}
                                    maxLength={255}
                                />
                            </div>
                            <InputError
                                message={errors.slug}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel
                                htmlFor="template_id"
                                value="Template"
                            />

                            <div className="flex items-center gap-x-3">
                                <input
                                    id="fullWidth"
                                    name="template_id"
                                    type="radio"
                                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                    value={1}
                                    checked={data.template_id === 1}
                                    onChange={handleTemplateChange}
                                />
                                <label
                                    htmlFor="fullWidth"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Full Width
                                </label>
                            </div>

                            <div className="flex items-center gap-x-3">
                                <input
                                    id="canvas"
                                    name="template_id"
                                    type="radio"
                                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                    value={0}
                                    checked={data.template_id === 0}
                                    onChange={handleTemplateChange}
                                />
                                <label
                                    htmlFor="canvas"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Canvas
                                </label>
                            </div>

                            <InputError
                                message={errors.template_id}
                                className="mb-3"
                            />
                        </div>

                        <ButtonBE disabled={processing}>
                            {page ? "Update" : "Save"}
                        </ButtonBE>
                    </form>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default FormData;
