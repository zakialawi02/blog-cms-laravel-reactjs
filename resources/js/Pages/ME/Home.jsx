import Footer from "@/Components/ME/Element/Footer/Footer";
import NavBar from "@/Components/ME/Element/NavBar/NavBar";
import Contact from "@/Components/ME/Layout/Contact";
import DarkModeToogle from "@/Components/ME/Element/ToogleDarkMode/DarkModeToogle";
import Hero from "@/Components/ME/Layout/Hero";
import About from "@/Components/ME/Layout/About";
import Portfolio from "@/Components/ME/Layout/Portfolio";
import QuotesGenerator from "@/Components/ME/Layout/QuotesGenerator";
import AnonMessage from "@/Components/ME/Layout/AnonMessage";
import "../../../css/me.css";
import ScrollToTop from "@/Components/ME/Element/ScrollToTop";
import { Head } from "@inertiajs/react";

const Home = ({ meta, notes }) => {
    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta
                    name="description"
                    content="This is a page specific description"
                />
                <meta
                    name="keywords"
                    content="resume, personal, portfolio, cv, ahmad zaki alawi"
                />
            </Head>

            <NavBar></NavBar>

            <DarkModeToogle></DarkModeToogle>

            <Hero></Hero>

            <About></About>

            <Portfolio></Portfolio>

            <QuotesGenerator></QuotesGenerator>

            <AnonMessage data={notes}></AnonMessage>

            <Contact></Contact>
            <ScrollToTop></ScrollToTop>
            <Footer></Footer>
        </>
    );
};

export default Home;
