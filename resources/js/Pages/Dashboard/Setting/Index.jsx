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
        console.log(data);

        router.post(
            route("admin.websettings.update", data.id),
            {
                _method: "put",
                ...data,
            },
            {
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

        setLogoPreview(webSetting?.logo ? `/${webSetting?.logo}` : null);
        console.log(data);
    }, []);

    return (
        <>
            <Head title="Web Setting"></Head>

            <DashboardLayout user={auth.user} metaTitle={meta.title}>
                <Card className="mb-3">
                    <form onSubmit={submit}>
                        <div className="flex space-x-3 mb-4 justify-end">
                            <ButtonBE type="submit" disabled={processing}>
                                Save
                            </ButtonBE>
                        </div>
                        <div className="col-span-full mb-3">
                            <label
                                htmlFor="favicon"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Favicon
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <div className="space-y-4">
                                    <img
                                        src={faviconPreview}
                                        alt="Favicon"
                                        className="object-cover rounded-md w-12 max-w-12 max-h-12"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://placehold.co/32x32";
                                        }}
                                    />
                                </div>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="upload-favicon"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Change
                                        </span>
                                        <input
                                            id="upload-favicon"
                                            name="upload-favicon"
                                            type="file"
                                            className="sr-only"
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
                        <div className="col-span-full mb-3">
                            <label
                                htmlFor="logo"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Logo
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <div className="space-y-4">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Logo"
                                            className="object-cover rounded-md w-12 max-w-12 max-h-12"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "https://placehold.co/32x32";
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full max-w-12 max-h-12 bg-gray-300 rounded-md">
                                            No Logo
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="upload-logo"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
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
                                    htmlFor="web_name"
                                    value="Website Name"
                                />
                                <span className="text-sm text-gray-500"></span>
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
                                    htmlFor="description"
                                    value="Website Description"
                                />
                                <span className="text-sm text-gray-500"></span>
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
                                    htmlFor="keywords"
                                    value="Website Keywords"
                                />
                                <span className="text-sm text-gray-500"></span>
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
                                <InputLabel htmlFor="emal" value="Email" />
                                <span className="text-sm text-gray-500"></span>
                            </div>
                            <TextInput
                                type="text"
                                id="emal"
                                className="w-full"
                                maxLength={100}
                                value={data.emal}
                                onChange={(e) => {
                                    setData("emal", e.target.value);
                                }}
                            />
                            <InputError
                                message={errors.emal}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    htmlFor="link_fb"
                                    value="Facebook Link"
                                />
                                <span className="text-sm text-gray-500"></span>
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
                            />
                            <InputError
                                message={errors.link_fb}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    htmlFor="link_ig"
                                    value="Instagram Link"
                                />
                                <span className="text-sm text-gray-500"></span>
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
                            />
                            <InputError
                                message={errors.link_ig}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    htmlFor="link_twitter"
                                    value="Twitter/X Link"
                                />
                                <span className="text-sm text-gray-500"></span>
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
                            />
                            <InputError
                                message={errors.link_twitter}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    htmlFor="link_youtube"
                                    value="Youtube Link"
                                />
                                <span className="text-sm text-gray-500"></span>
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
                            />
                            <InputError
                                message={errors.link_youtube}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    htmlFor="link_linkedin"
                                    value="Linkedin Link"
                                />
                                <span className="text-sm text-gray-500"></span>
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
                            />
                            <InputError
                                message={errors.link_linkedin}
                                className="mb-3"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="mb-1">
                                <InputLabel
                                    htmlFor="link_github"
                                    value="Github Link"
                                />
                                <span className="text-sm text-gray-500"></span>
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
                            />
                            <InputError
                                message={errors.link_github}
                                className="mb-3"
                            />
                        </div>
                    </form>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
