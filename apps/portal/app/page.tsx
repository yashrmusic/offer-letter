import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <Industries />
            <About />
            <Contact />
            <Footer />
        </>
    );
}
