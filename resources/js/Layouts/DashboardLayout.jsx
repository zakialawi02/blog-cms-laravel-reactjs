import HeaderAdmin from "@/Components/Element/Header/HeaderAdmin";
import "../../css/dashboard.css";
import SidebarAdmin from "@/Components/Element/Sidebar/SidebarAdmin";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";

const DashboardLayout = ({ user, metaTitle = "", children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(
        window.innerWidth >= 768
    );

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <Head title={`${metaTitle} • Dashboard`} />
            <SidebarAdmin show={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main
                className={`w-full font-Lato md:w-[calc(100%-256px)] text-backend-dark md:ml-64 bg-backend-light min-h-screen transition-all main ${
                    isSidebarOpen ? "" : "active"
                }`}
            >
                <HeaderAdmin toggleSidebar={toggleSidebar} user={user} />

                <div className="p-4 space-y-4">{children}</div>
            </main>
        </>
    );
};

export default DashboardLayout;
