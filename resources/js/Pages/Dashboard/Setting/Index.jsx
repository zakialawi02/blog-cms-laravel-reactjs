import ButtonBE from "@/Components/Element/Button/ButtonBE";
import Card from "@/Components/Element/Card/Card";
import InputError from "@/Components/Element/Input/InputError";
import InputLabel from "@/Components/Element/Input/InputLabel";
import TextInput from "@/Components/Element/Input/TextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Index = ({ auth, meta, webSetting = null }) => {
    const [faviconPreview, setFaviconPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const { data, setData, processing, errors, setError } = useForm({
        id: webSetting?.id ?? null,
        web_name: webSetting?.web_name ?? "",
        tagline: webSetting?.tagline ?? "",
        title: webSetting?.title ?? "",
        description: webSetting?.description ?? "",
        keywords: webSetting?.keywords ?? "",
        logo: null,
        favicon: null,
        email: webSetting?.email ?? "",
        link_fb: webSetting?.link_fb ?? "",
        link_ig: webSetting?.link_ig ?? "",
        link_twitter: webSetting?.link_twitter ?? "",
        link_youtube: webSetting?.link_youtube ?? "",
        link_linkedin: webSetting?.link_linkedin ?? "",
        link_github: webSetting?.link_github ?? "",
        can_join_contributor: webSetting.can_join_contributor ?? false,
    });

    const handleFaviconChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setData("favicon", file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setFaviconPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setData("logo", file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogoPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        router.post(
            route("admin.websettings.update", data.id),
            {
                _method: "put",
                ...data,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onError: (error) => {
                    setError(error);
                },
                onSuccess: () => {
                    router.reload();
                },
            }
        );
    };

    useEffect(() => {
        setFaviconPreview(
            webSetting?.favicon ? `/${webSetting?.favicon}` : null
        );

        setLogoPreview(webSetting?.logo ? `/logo/${webSetting?.logo}` : null);
    }, []);

    return (
        <>
            <Head title="Web Setting"></Head>

            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <Card className="mb-3">
                    <form onSubmit={submit}>
                        <div className="flex justify-end mb-4 space-x-3">
                            <ButtonBE type="submit" disabled={processing}>
                                Save
                            </ButtonBE>
                        </div>
                        <div className="mb-3 col-span-full">
                            <label
                                htmlFor="favicon"
                                className="block text-lg font-semibold text-gray-900"
                            >
                                Favicon
                            </label>
                            <div className="flex items-center mt-2 gap-x-3">
                                <div className="space-y-4">
                                    <img
                                        src={faviconPreview}
                                        alt="Favicon"
                                        className="object-cover w-12 rounded-md max-w-12 max-h-12"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://placehold.co/32x32";
                                        }}
                                    />
                                </div>
                                <div className="flex mt-4 text-sm text-gray-600">
                                    <label
                                        htmlFor="upload-favicon"
                                        className="relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Change
                                        </span>
                                        <input
                                            id="upload-favicon"
                                            name="upload-favicon"
                                            type="file"
                                            className="sr-only"
                                            accept="image/png"
                                            onChange={handleFaviconChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            <InputError
                                message={errors.favicon}
                                className="my-3"
                            />
                        </div>
                        <div className="mb-3 col-span-full">
                            <label
                                htmlFor="logo"
                                className="block text-lg font-semibold text-gray-900"
                            >
                                Logo
                            </label>
                            <div className="flex items-center mt-2 gap-x-3">
                                <div className="space-y-4">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Logo"
                                            className="object-cover w-full rounded-md max-w-20 max-h-12"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "https://placehold.co/32x32";
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full bg-gray-300 rounded-md max-w-12 max-h-12">
                                            No Logo
                                        </div>
                                    )}
                                </div>
                                <div className="flex mt-4 text-sm text-gray-600">
                                    <label
                                        htmlFor="upload-logo"
                                        className="relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Change
                                        </span>
                                        <input
                                            id="upload-logo"
                                            name="upload-logo"
                                            type="file"
                                            className="sr-only"
                                            onChange={handleLogoChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            <InputError
                                message={errors.favicon}
                                className="my-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="web_name"
                                    value="Website Name"
                                />
                                <span className="text-sm text-gray-500">
                                    Main Title Website, Show in header
                                </span>
                            </div>
                            <TextInput
                                type="text"
                                id="web_name"
                                className="w-full"
                                maxLength={100}
                                value={data.web_name}
                                onChange={(e) => {
                                    setData("web_name", e.target.value);
                                }}
                            />
                            <InputError
                                message={errors.web_name}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="tagline"
                                    value="Tagline"
                                />
                                <span className="text-sm text-gray-500">
                                    Show in footer section
                                </span>
                            </div>
                            <TextInput
                                type="text"
                                id="tagline"
                                className="w-full"
                                maxLength={100}
                                value={data.tagline}
                                onChange={(e) => {
                                    setData("tagline", e.target.value);
                                }}
                            />
                            <InputError
                                message={errors.tagline}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="title"
                                    value="Title"
                                />
                                <span className="text-sm text-gray-500">
                                    Show in footer section
                                </span>
                            </div>
                            <TextInput
                                type="text"
                                id="title"
                                className="w-full"
                                maxLength={100}
                                value={data.title}
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
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="description"
                                    value="Website Description"
                                />
                            </div>
                            <textarea
                                id="description"
                                name="description"
                                rows="5"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Enter website description"
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
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="keywords"
                                    value="Website Keywords"
                                />
                            </div>
                            <textarea
                                id="keywords"
                                name="keywords"
                                rows="5"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Enter keywords. Use comma to separate. Example: keyword1, keyword2, keyword3"
                                maxLength={255}
                                value={data.keywords}
                                onChange={(e) => {
                                    setData("keywords", e.target.value);
                                }}
                            ></textarea>
                            <InputError
                                message={errors.keywords}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="email"
                                    value="Email"
                                />
                            </div>
                            <TextInput
                                type="text"
                                id="email"
                                className="w-full"
                                maxLength={100}
                                value={data.email}
                                onChange={(e) => {
                                    setData("email", e.target.value);
                                }}
                            />
                            <InputError
                                message={errors.email}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="link_fb"
                                    value="Facebook Link"
                                />
                            </div>
                            <TextInput
                                type="text"
                                id="link_fb"
                                className="w-full"
                                maxLength={100}
                                value={data.link_fb}
                                onChange={(e) => {
                                    setData("link_fb", e.target.value);
                                }}
                                placeholder="https://facebook.com/"
                            />
                            <InputError
                                message={errors.link_fb}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="link_ig"
                                    value="Instagram Link"
                                />
                            </div>
                            <TextInput
                                type="text"
                                id="link_ig"
                                className="w-full"
                                maxLength={100}
                                value={data.link_ig}
                                onChange={(e) => {
                                    setData("link_ig", e.target.value);
                                }}
                                placeholder="https://instagram.com/"
                            />
                            <InputError
                                message={errors.link_ig}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="link_twitter"
                                    value="Twitter/X Link"
                                />
                            </div>
                            <TextInput
                                type="text"
                                id="link_twitter"
                                className="w-full"
                                maxLength={100}
                                value={data.link_twitter}
                                onChange={(e) => {
                                    setData("link_twitter", e.target.value);
                                }}
                                placeholder="https://x.com/"
                            />
                            <InputError
                                message={errors.link_twitter}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="link_youtube"
                                    value="Youtube Link"
                                />
                            </div>
                            <TextInput
                                type="text"
                                id="link_youtube"
                                className="w-full"
                                maxLength={100}
                                value={data.link_youtube}
                                onChange={(e) => {
                                    setData("link_youtube", e.target.value);
                                }}
                                placeholder="https://youtube.com/"
                            />
                            <InputError
                                message={errors.link_youtube}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="link_linkedin"
                                    value="Linkedin Link"
                                />
                            </div>
                            <TextInput
                                type="text"
                                id="link_linkedin"
                                className="w-full"
                                maxLength={100}
                                value={data.link_linkedin}
                                onChange={(e) => {
                                    setData("link_linkedin", e.target.value);
                                }}
                                placeholder="https://linkedin.com/"
                            />
                            <InputError
                                message={errors.link_linkedin}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="link_github"
                                    value="Github Link"
                                />
                            </div>
                            <TextInput
                                type="text"
                                id="link_github"
                                className="w-full"
                                maxLength={100}
                                value={data.link_github}
                                onChange={(e) => {
                                    setData("link_github", e.target.value);
                                }}
                                placeholder="https://github.com/"
                            />
                            <InputError
                                message={errors.link_github}
                                className="mb-3"
                            />
                        </div>

                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    className="text-lg font-semibold"
                                    htmlFor="link_github"
                                    value="Open For Contributor"
                                />
                            </div>
                            <label
                                htmlFor="joinContributor"
                                className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-backend-primary"
                            >
                                <input
                                    type="checkbox"
                                    id="joinContributor"
                                    className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
                                    checked={
                                        data.can_join_contributor ? true : false
                                    }
                                    onChange={(e) => {
                                        setData(
                                            "can_join_contributor",
                                            e.target.checked
                                        );
                                    }}
                                />
                                <span className="absolute inset-y-0 z-10 inline-flex items-center justify-center m-1 text-gray-400 transition-all bg-white rounded-full start-0 size-6 peer-checked:start-6 peer-checked:text-green-600">
                                    <svg
                                        data-unchecked-icon=""
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        data-checked-icon=""
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="hidden size-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </label>
                        </div>
                    </form>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
