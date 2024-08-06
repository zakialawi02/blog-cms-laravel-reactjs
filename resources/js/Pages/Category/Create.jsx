import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Element/Card/Card";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/Element/Input/TextInput";
import InputLabel from "@/Components/Element/Input/InputLabel";
import InputError from "@/Components/Element/Input/InputError";
import ButtonBE from "@/Components/Element/Button/ButtonBE";
import usePreventNavigation from "@/Hook/usePreventNavigation";
import { useEffect, useState } from "react";

const EmptyPage = ({ auth, meta }) => {
    const [isFormChanged, setIsFormChanged] = useState(false);
    usePreventNavigation(isFormChanged);

    const { data, setData, errors, post, processing } = useForm({
        category: "",
        slug: "",
    });

    const generateSlug = async (categoryName) => {
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
    };

    useEffect(() => {
        if (data.category) {
            generateSlug(data.category);
        }
    }, [data.category]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.categories.store"));
    };

    return (
        <>
            <Head title={meta.title}></Head>

            <DashboardLayout user={auth.user}>
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

                        <div className="mb-3">
                            <InputLabel
                                htmlFor="slug"
                                value="Category Slug / url"
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

                        <ButtonBE disabled={processing}>Save</ButtonBE>
                    </form>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default EmptyPage;
