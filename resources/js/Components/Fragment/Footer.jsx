import { Link, useForm } from "@inertiajs/react";
import FooterMenu from "../Element/Footer/FooterMenu";
import InputError from "../Element/Input/InputError";
import axios from "axios";
import { useEffect, useState } from "react";
import SkeletonOneLine from "../Element/Skeleton/SkeletonOneLine";

const Footer = () => {
    const [loadingMenu, setLoadingMenu] = useState(true);
    const [navItemData, setNavItemData] = useState([]);
    const [webMeta, setWebMeta] = useState([]);
    const { data, setData, errors, setError, clearErrors, reset } = useForm({
        email: "",
    });

    const submitEmail = (e) => {
        e.preventDefault();
        clearErrors();
        axios
            .post(route("newsletter.store"), data)
            .then((res) => {
                if (res.status === 200 || 201) {
                    reset();
                    alert(res.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                setError("email", error.response.data.message);
            });
    };

    useEffect(() => {
        axios
            .get(route("navItemFooterData"))
            .then((res) => {
                setNavItemData(res.data);
                setLoadingMenu(false);
            })
            .catch((error) => {
                console.error(error);
                setNavItemData([]);
                setLoadingMenu(false);
            });

        axios
            .get("/meta-web")
            .then((response) => {
                setWebMeta({
                    title: response.data.title,
                    description: response.data.description,
                    link_fb: response.data.link_fb,
                    link_ig: response.data.link_ig,
                    link_twitter: response.data.link_twitter,
                    email: response.data.email,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <footer id="footer" className="flex items-end justify-center">
                <div className="w-full">
                    <div className="px-1 py-16">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-6 md:grid-cols-4">
                                <div className="md:col-span-2">
                                    <Link
                                        preserveState
                                        className="block mb-6 navbar-brand"
                                        href="/blog"
                                    >
                                        <h2
                                            id="title_web"
                                            className="text-3xl font-bold text-frontend-primary"
                                        >
                                            {webMeta.title}
                                        </h2>
                                    </Link>
                                    <p
                                        id="description_web"
                                        className="max-w-xs text-base font-medium text-frontend-muted"
                                    >
                                        {webMeta.description}
                                    </p>

                                    <h3 className="mt-5 text-xl font-bold text-frontend-dark">
                                        Follow Us:
                                    </h3>
                                    <div className="flex gap-3 mt-4 font-normal text-frontend-dark">
                                        <a
                                            id="sosial_facebook"
                                            href={webMeta.link_fb ?? "#"}
                                            className="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"
                                        >
                                            <i
                                                className="ri-facebook-fill"
                                                target="_blank"
                                            ></i>
                                        </a>
                                        <a
                                            id="sosial_twitter"
                                            href={webMeta.link_twitter ?? "#"}
                                            className="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"
                                            target="_blank"
                                        >
                                            <i className="ri-twitter-x-fill"></i>
                                        </a>
                                        <a
                                            id="sosial_linkedin"
                                            href={webMeta.link_linkedin ?? "#"}
                                            className="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"
                                            target="_blank"
                                        >
                                            <i className="ri-linkedin-box-fill"></i>
                                        </a>
                                        <a
                                            id="sosial_instagram"
                                            href={webMeta.link_ig ?? "#"}
                                            className="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"
                                            target="_blank"
                                        >
                                            <i className="ri-instagram-fill"></i>
                                        </a>
                                    </div>
                                </div>

                                <FooterMenu>
                                    {loadingMenu && (
                                        <SkeletonOneLine height={48} />
                                    )}

                                    {!loadingMenu && navItemData?.footer_a && (
                                        <>
                                            <h5 className="text-2xl font-bold ">
                                                About
                                            </h5>
                                            <FooterMenu.MenuBody>
                                                {navItemData?.footer_a?.map(
                                                    (item, index) => (
                                                        <FooterMenu.MenuItem
                                                            key={index}
                                                            url={item.url}
                                                            children={item.name}
                                                        />
                                                    )
                                                )}
                                            </FooterMenu.MenuBody>
                                        </>
                                    )}
                                </FooterMenu>

                                <FooterMenu>
                                    {loadingMenu && (
                                        <SkeletonOneLine height={48} />
                                    )}

                                    {!loadingMenu && navItemData?.footer_b && (
                                        <>
                                            <h5 className="text-2xl font-bold ">
                                                Blog
                                            </h5>
                                            <FooterMenu.MenuBody>
                                                {navItemData?.footer_b?.map(
                                                    (item, index) => (
                                                        <FooterMenu.MenuItem
                                                            key={index}
                                                            url={item.url}
                                                            children={item.name}
                                                        />
                                                    )
                                                )}
                                            </FooterMenu.MenuBody>
                                        </>
                                    )}
                                </FooterMenu>

                                <div className="md:col-span-2">
                                    <div className="flex flex-col">
                                        <h5 className="mb-6 text-2xl font-bold">
                                            Contact Us
                                        </h5>
                                        <p
                                            id="web_email"
                                            className="text-base font-medium text-frontend-muted mt-2s"
                                        >
                                            {webMeta.email}
                                        </p>
                                        <form
                                            onSubmit={submitEmail}
                                            className="w-full max-w-lg mt-6 ms-auto"
                                        >
                                            <p className="p-1 text-base font-medium text-frontend-dark">
                                                Subscribe to our newsletter
                                            </p>
                                            <div className="relative flex items-center px-1 overflow-hidden bg-white rounded-md shadow">
                                                <input
                                                    type="email"
                                                    placeholder="Your Email Address"
                                                    className="px-3 py-3.5 text-black w-full text-base border-0 ring-0 bg-white outline-none focus:ring-0"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <button className="px-3 py-1 font-semibold text-white transition-all duration-500 rounded bg-frontend-secondary hover:bg-frontend-primary">
                                                    <i className="ri-send-plane-2-line"></i>
                                                </button>
                                            </div>

                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-300">
                        <div className="container">
                            <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between">
                                <p className="text-base font-semibold text-frontend-muted">
                                    Copyright &copy;
                                    <script>
                                        document.write(new Date().getFullYear())
                                    </script>
                                    . All rights reserved.
                                </p>

                                <div className="space-x-4">
                                    <a
                                        href="/p/terms"
                                        className="text-base hover:text-frontend-primary text-frontend-muted"
                                    >
                                        Terms Conditions
                                    </a>

                                    <a
                                        href="/p/privacy"
                                        className="text-base text-frontend-muted hover:text-frontend-primary"
                                    >
                                        Privacy Policy
                                    </a>

                                    <a
                                        href="/p/contact"
                                        className="text-base text-frontend-muted hover:text-frontend-primary"
                                    >
                                        Contact
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
