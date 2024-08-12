import Footer from "@/Components/Element/Footer/Footer";
import HeaderBlog from "@/Components/Element/Header/HeaderBlog";

const GuestLayout = ({ className = "", children }) => {
    className = className ? className : "w-full";

    return (
        <>
            <div className="font-Lato bg-frontend-base-100">
                <HeaderBlog />

                <main className={className}>{children}</main>

                <Footer />
            </div>
        </>
    );
};

export default GuestLayout;
