import Footer from "@/Components/Fragment/Footer";
import HeaderBlog from "@/Components/Fragment/HeaderBlog";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

const GuestLayout = ({ className = "", children }) => {
    className = className ? className : "w-full";

    const [favicon, setFavicon] = useState(null);
    useEffect(() => {
        axios
            .get("/meta-web")
            .then((response) => {
                setFavicon(`/${response.data.favicon}`);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <Head>
                <link rel="icon" type="image/*" href={favicon} />
            </Head>

            <div className="font-Lato bg-frontend-base-100">
                <HeaderBlog />

                <main className={className}>{children}</main>

                <Footer />
            </div>
        </>
    );
};

export default GuestLayout;
