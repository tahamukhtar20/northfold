import Layout from "../components/Layout.tsx";
import Hero from "../components/Hero.tsx";
import ServiceSummary from "../components/ServiceSummary.tsx";

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
    return (
        <Layout>
            <Hero
                text="from your software development partner"
                tagline="#ExpectMore"
                image="https://picsum.photos/1920"
            />
            {/***
             Services Summary Section
             ***/}
            <section className="bg-white flex flex-col gap-4 lg:p-20 xs:p-10 p-2">
                {
                    services.map((service, index) => (
                        <div>
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