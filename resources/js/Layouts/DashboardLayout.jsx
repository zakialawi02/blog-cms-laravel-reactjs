import HeaderAdmin from "@/Components/Element/Header/HeaderAdmin";
import "../../css/dashboard.css";
import SidebarAdmin from "@/Components/Element/Sidebar/SidebarAdmin";
import { useEffect, useState } from "react";

const DashboardLayout = ({ user, children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [isMobile]);

    return (
        <>
            <SidebarAdmin show={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main
                className={`w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main ${
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
