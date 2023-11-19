import Layout from "../components/Layout.tsx";
import Hero from "../components/Hero.tsx";
import ServicesBrief from "../components/ServicesBrief.tsx";
import {companyServices, services, tutorials} from "../temp-data/content.ts";
import ServicesSummarySection from "../components/ServicesSummarySection.tsx";
import ServicesTutorial from "../components/ServicesTutorial.tsx";

export default function Services() {
    return (
        <Layout>
            <Hero
                text="Software Development Tailored to Your Needs"
                tagline="Services"
                image="https://picsum.photos/1920"
            />
            <ServicesBrief companyServices={companyServices} headline={"We help translating ideas into products."}
                           subTagline={"Our know-how includes:"}
                           lineAboveContact={"Want to discuss the technology, costs, or project timeline?"}/>
            <ServicesTutorial
                tutorials={tutorials}
            />
            <div className=" lg:px-20 xs:px-10 px-4 lg:pt-20 xs:pt-10 pt-4 flex flex-col gap-8 -mb-8">
                <h1 className="font-black sm:text-5xl xs:text-3xl text-2xl">Projects</h1>
                <desc className="sm:text-xl xs:text-md text-sm font-bold">You can expect us to offer these services:
                </desc>
            </div>
            <ServicesSummarySection services={services}/>
        </Layout>
    )
}