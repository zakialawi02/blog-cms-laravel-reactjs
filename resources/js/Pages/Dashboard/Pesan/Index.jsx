import Card from "@/Components/Element/Card/Card";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

const Index = ({ auth }) => {
    return (
        <>
            <Head title="Message Panel"></Head>

            <DashboardLayout user={auth.user}>
                <Card>
                    <h1>h1 EmptyPage</h1>
                    <h2>h2 EmptyPage</h2>
                    <p>p EmptyPage</p>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Index;
