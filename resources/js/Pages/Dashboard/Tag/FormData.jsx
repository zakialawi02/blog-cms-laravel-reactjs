import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Element/Card/Card";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/Element/Input/TextInput";
import InputLabel from "@/Components/Element/Input/InputLabel";
import InputError from "@/Components/Element/Input/InputError";
import ButtonBE from "@/Components/Element/Button/ButtonBE";
import usePreventNavigation from "@/Hook/usePreventNavigation";
import { useEffect, useRef, useState } from "react";

const Create = ({ auth, tag = null, meta }) => {
    const [isFormChanged, setIsFormChanged] = useState(false);
    usePreventNavigation(isFormChanged);
    const isUpdate = useRef(tag ? true : false);

    const { data, setData, errors, post, put, processing } = useForm({
        tag_name: tag?.tag_name ?? "",
        slug: tag?.slug ?? "",
    });

    const generateSlug = async (tag_nameName) => {
        try {
            const response = await axios.post(
                route("admin.tags.generateSlug"),
                {
                    tag_name: tag_nameName,
                }
            );

            setData("slug", response.data.slug);
        } catch (error) {
            console.error("Error generating slug", error);
        }
    };

    useEffect(() => {
        if (data.tag_name) {
            generateSlug(data.tag_name);
            console.log(data.tag_name);
            console.log(data.slug);
        }
    }, [data.tag_name]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdate.current) {
            put(route("admin.tags.update", tag.slug));
        } else {
            post(route("admin.tags.store"));
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
                                htmlFor="tag_name"
                                value="Tag Name"
                                className="mb-2"
                            />
                            <TextInput
                                type="text"
                                id="tag_name"
                                className="w-full"
                                isFocused={true}
                                value={data.tag_name}
                                onChange={(e) =>
                                    setData("tag_name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.tag_name}
                                className="mb-3"
                            />
                        </div>

                        <div className="mb-3">
                            <InputLabel
                                htmlFor="slug"
                                value="Tag Slug / url"
                                className="mb-2"
                            />
                            <TextInput
                                type="text"
                                id="slug"
                                className="w-full"
                                value={data.slug}
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
                            {tag ? "Update" : "Create"}
                        </ButtonBE>
                    </form>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Create;