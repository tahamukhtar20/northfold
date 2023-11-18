import Layout from "../components/Layout.tsx";
import Hero from "../components/Hero.tsx";
import ServiceSummary from "../components/ServiceSummary.tsx";
import CompanyService from "../components/CompanyService.tsx";
import Button from "../components/Button.tsx";

export default function Home() {
    const services = [
        {
            imageUrl: "https://picsum.photos/1921",
            headline: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttonText: "Learn More",
            buttonUrl: "/services/something-nice",
        },
        {
            imageUrl: "https://picsum.photos/1922",
            headline: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            buttonText: "Learn More",
            buttonUrl: "/services/something-nice",
        },
    ];

    const companyServices = [
        {
            image: "https://picsum.photos/1923",
            title: "Lorem Ipsum",
            link: "/services/something-nice",
            desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            image: "https://picsum.photos/1924",
            title: "Lorem Ipsum",
            link: "/services/something-nice",
            desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            image: "https://picsum.photos/1925",
            title: "Lorem Ipsum",
            link: "/services/something-nice",
            desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            image: "https://picsum.photos/1926",
            title: "Lorem Ipsum",
            link: "/services/something-nice",
            desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
    ];

    return (
        <Layout>
            <Hero
                text="from your software development partner"
                tagline="#ExpectMore"
                image="https://picsum.photos/2160"
            />
            {/***
             Company Introduction Section
             ***/}
            <section className="bg-white flex flex-col gap-4 lg:p-20 xs:p-10 p-2 relative pb-0 lg:pb-0 xs:pb-0">
                <div className="w-1/2 h-full absolute top-0 left-0 pr-3">
                    <div className="relative w-full h-full flex flex-row justify-between">
                        <div
                            className="bg-primary-dark opacity-10 w-1/6 h-full "></div>
                        <div
                            className="bg-primary-dark opacity-10 w-1/6 h-full"></div>
                        <div
                            className="bg-primary-dark opacity-10 w-1/6 h-full"></div>
                        <div
                            className="bg-primary-dark opacity-10 w-1/6 h-full"></div>
                        <div
                            className="bg-primary-dark opacity-10 w-1/6 h-full"></div>
                    </div>
                </div>
                <div className="w-1/2 h-full absolute top-0 right-0 pl-3">
                    <div className="relative w-full h-full flex flex-col justify-between">
                        <div
                            className="bg-tertiary-dark opacity-10 w-full h-1/6"></div>
                        <div
                            className="bg-tertiary-dark opacity-10 w-full h-1/6"></div>
                        <div
                            className="bg-tertiary-dark opacity-10 w-full h-1/6"></div>
                        <div
                            className="bg-tertiary-dark opacity-10 w-full h-1/6"></div>
                        <div
                            className="bg-tertiary-dark opacity-10 w-full h-1/6"></div>
                    </div>
                </div>
                <div className="w-full h-full bg-white z-10 p-6 flex flex-col gap-4">
                    <h1 className="sm:text-5xl xs:text-3xl text-2xl font-black">
                        Some Company Introduction Here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod
                    </h1>
                    <h2 className="sm:text-xl xs:text-md text-sm font-bold">We can provide you these services:</h2>
                    <div className="flex flex-col gap-4 mt-8">
                        {
                            companyServices.map((companyService, index) => (
                                <CompanyService image={companyService.image} title={companyService.title} key={index}
                                                desc={companyService.desc} link={companyService.link}/>
                            ))
                        }
                    </div>
                </div>
                <div className="w-full h-full flex flex-row gap-2">
                    <div className="w-2 min-h-full bg-primary-dark"/>
                    <h2 className="sm:text-xl xs:text-md text-sm font-bold">some text encouraging the customer to
                        contact</h2>
                </div>
                <a className="w-full z-10" href={"/contact"}>
                    <Button>
                        Contact Us
                    </Button>
                </a>
            </section>

            {/***
             Services Summary Section
             ***/}
            <section className="bg-white flex flex-col gap-4 lg:p-20 xs:p-10 p-2">
                {
                    services.map((service, index) => (
                        <div className="static z-10">
                            <ServiceSummary
                                reverse={index % 2 === 0}
                                key={index}
                                imageUrl={service.imageUrl}
                                headline={service.headline}
                                description={service.description}
                                buttonText={service.buttonText}
                                buttonUrl={service.buttonUrl}
                            />
                        </div>
                    ))
                }
            </section>
        </Layout>
    );
}