import { Link, useForm } from "@inertiajs/react";
import FooterMenu from "../Element/Footer/FooterMenu";
import InputError from "../Element/Input/InputError";
import axios from "axios";

const Footer = () => {
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
                console.log(error);
                setError("email", error.response.data.message);
            });
    };

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
                                        <h2 className="text-3xl font-bold text-frontend-primary">
                                            Zakialawi Blog
                                        </h2>
                                    </Link>
                                    <p className="max-w-xs text-base font-medium text-frontend-muted">
                                        Personal Blog & platform
                                    </p>

                                    <h3 className="mt-5 text-xl font-bold text-frontend-dark">
                                        Follow Us:
                                    </h3>
                                    <div className="flex gap-3 mt-4 font-normal text-frontend-dark">
                                        <a
                                            href="#"
                                            className="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"
                                        >
                                            <i
                                                className="ri-facebook-fill"
                                                target="_blank"
                                            ></i>
                                        </a>
                                        <a
                                            href="https://twitter.com/zakialawi_"
                                            className="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"
                                            target="_blank"
                                        >
                                            <i className="ri-twitter-x-fill"></i>
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/ahmad-zaki-alawi/"
                                            className="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"
                                            target="_blank"
                                        >
                                            <i className="ri-linkedin-box-fill"></i>
                                        </a>
                                        <a
                                            href="https://www.instagram.com/zakialawi_/"
                                            className="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"
                                            target="_blank"
                                        >
                                            <i className="ri-instagram-fill"></i>
                                        </a>
                                    </div>
                                </div>

                                <FooterMenu>
                                    <h5 className="text-2xl font-bold ">
                                        About
                                    </h5>
                                    <FooterMenu.MenuBody>
                                        <FooterMenu.MenuItem
                                            url="#"
                                            children="About Us"
                                        />
                                        <FooterMenu.MenuItem
                                            url="#"
                                            children="Contact Us"
                                        />
                                        <FooterMenu.MenuItem
                                            url="#"
                                            children="Privacy Policy"
                                        />
                                        <FooterMenu.MenuItem
                                            url="#"
                                            children="Terms & Conditions"
                                        />
                                    </FooterMenu.MenuBody>
                                </FooterMenu>

                                <FooterMenu>
                                    <h5 className="text-2xl font-bold ">
                                        Blog
                                    </h5>
                                    <FooterMenu.MenuBody>
                                        <FooterMenu.MenuItem
                                            url="#"
                                            children="Menu 1"
                                        />
                                        <FooterMenu.MenuItem
                                            url="#"
                                            children="Menu 2"
                                        />
                                        <FooterMenu.MenuItem
                                            url="#"
                                            children="Menu 3"
                                        />
                                    </FooterMenu.MenuBody>
                                </FooterMenu>

                                <div className="md:col-span-2">
                                    <div className="flex flex-col">
                                        <h5 className="mb-6 text-2xl font-bold">
                                            Contact Us
                                        </h5>
                                        <p className="text-base font-medium text-frontend-muted mt-2s">
                                            hallo@zakialawi.my.id
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

                                <div>
                                    <Link
                                        href="#"
                                        className="text-base font-semibold hover:text-frontend-primary text-frontend-muted"
                                    >
                                        Terms Conditions
                                    </Link>
                                    <span className="text-base font-semibold text-frontend-muted">
                                        {" "}
                                        &amp;{" "}
                                    </span>
                                    <Link
                                        href="#"
                                        className="text-base font-semibold text-frontend-muted hover:text-frontend-primary"
                                    >
                                        Privacy Policy
                                    </Link>
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
