import Layout from "../components/Layout.tsx";
import Hero from "../components/Hero.tsx";
import ServiceSummary from "../components/ServiceSummary.tsx";
import CompanyService from "../components/CompanyService.tsx";
import Button from "../components/Button.tsx";
import BlogPreview from "../components/BlogPreview.tsx";
import Testimonial from "../components/Testimonial.tsx";
import {useEffect, useRef} from "react";
import CaseStudyPreview from "../components/CaseStudyPreview.tsx";

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
    const blogPosts = [
        {
            title: "Lorem Ipsum",
            tagLine: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: "/blog/something-nice",
        },
        {
            title: "Lorem Ipsum",
            tagLine: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: "/blog/something-nice",
        },
        {
            title: "Lorem Ipsum",
            tagLine: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: "/blog/something-nice",
        },
        {
            title: "Lorem Ipsum",
            tagLine: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: "/blog/something-nice",
        },
        {
            title: "Lorem Ipsum",
            tagLine: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: "/blog/something-nice",
        },
        {
            title: "Lorem Ipsum",
            tagLine: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: "/blog/something-nice",
        },
    ];

    const testimonials = [
        {
            company: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Lorem Ipsum",
            title: "Lorem Ipsum",
        }, {
            company: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Lorem Ipsum",
            title: "Lorem Ipsum",
        }, {
            company: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Lorem Ipsum",
            title: "Lorem Ipsum",
        },
        {
            company: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Lorem Ipsum",
            title: "Lorem Ipsum",
        }, {
            company: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Lorem Ipsum",
            title: "Lorem Ipsum",
        }, {
            company: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Lorem Ipsum",
            title: "Lorem Ipsum",
        }, {
            company: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Lorem Ipsum",
            title: "Lorem Ipsum",
        },
        {
            company: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Lorem Ipsum",
            title: "Lorem Ipsum",
        },]

    const caseStudies = [
        {
            title: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "https://picsum.photos/1927",
            link: "/case-studies/something-nice",
        }, {
            title: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "https://picsum.photos/1928",
            link: "/case-studies/something-nice",
        }, {
            title: "Lorem Ipsum",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "https://picsum.photos/1929",
            link: "/case-studies/something-nice",
        }]
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef?.current;

        if (container) {
            let scrollInterval: number | undefined = undefined;
            let isDragging = false;
            let startX = 0;
            let scrollLeft = 0;

            const scrollWidth = container.scrollWidth;
            const containerWidth = container.clientWidth;

            const scroll = () => {
                if (!isDragging) {
                    if (container.scrollLeft < scrollWidth - containerWidth) {
                        container.scrollLeft += 1;
                    } else {
                        container.scrollLeft = 0;
                    }
                }
            };

            const startScroll = () => {
                clearInterval(scrollInterval);
                scrollInterval = setInterval(scroll, 50);
            };

            const pauseScroll = () => {
                clearInterval(scrollInterval);
                scrollInterval = undefined;
            };

            const handleMouseDown = (e: MouseEvent) => {
                isDragging = true;
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
                pauseScroll();
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
            };

            const handleMouseUp = () => {
                isDragging = false;
            };

            const handleTouchStart = (e: TouchEvent) => {
                isDragging = true;
                startX = e.touches[0].pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
                pauseScroll();
            };

            const handleTouchMove = (e: TouchEvent) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.touches[0].pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
            };

            const handleTouchEnd = () => {
                isDragging = false;
            };

            container.addEventListener('mouseenter', pauseScroll);
            container.addEventListener('mouseleave', startScroll);

            container.addEventListener('mousedown', handleMouseDown);
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseup', handleMouseUp);
            container.addEventListener('mouseleave', handleMouseUp);

            container.addEventListener('touchstart', handleTouchStart);
            container.addEventListener('touchmove', handleTouchMove);
            container.addEventListener('touchend', handleTouchEnd);
            container.addEventListener('touchcancel', handleTouchEnd);

            startScroll();

            return () => {
                clearInterval(scrollInterval);

                container.removeEventListener('mouseenter', pauseScroll);
                container.removeEventListener('mouseleave', startScroll);

                container.removeEventListener('mousedown', handleMouseDown);
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseup', handleMouseUp);
                container.removeEventListener('mouseleave', handleMouseUp);

                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
                container.removeEventListener('touchcancel', handleTouchEnd);
            };
        }
    }, []);


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
            <section className="bg-white flex flex-col gap-4 lg:p-20 xs:p-10 p-4 relative pb-0 lg:pb-0 xs:pb-0">
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
                <div className="p-4 flex-col flex gap-2">
                    <div className="w-full h-full flex flex-row gap-2">
                        <div className="w-2 min-h-full bg-primary-dark"/>
                        <h2 className="sm:text-xl xs:text-md text-sm font-bold">some text encouraging the customer to
                            contact</h2>
                    </div>
                    <a className="w-fit z-10 " href={"/contact"}>
                        <Button>
                            Contact Us
                        </Button>
                    </a></div>
            </section>
            {/***
             Services Summary Section
             ***/}
            <section className="bg-white flex flex-col gap-4 lg:p-20 xs:p-10 p-4">
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
            {/***
             Blog Post Section
             ***/}
            <section className="flex flex-col lg:px-20 xs:px-10 px-4 lg:pb-20 xs:pb-10 pb-4 gap-6">
                <h1 className="font-black sm:text-5xl xs:text-3xl text-2xl">Blogs</h1>
                <desc className="font-inconsolata">Some description about blogs lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </desc>
                <div className="bg-white grid sm:grid-cols-2 gap-4 place-items-center">
                    {blogPosts.map((blogPost, index) => (
                        <BlogPreview title={blogPost.title} tagLine={blogPost.tagLine}
                                     description={blogPost.description} link={blogPost.link} key={index}/>))}
                    <a href={"/blog"} className="w-fit sm:col-span-2">
                        <Button className="!bg-secondary text-white hover:!bg-secondary-light px-8">
                            View All
                        </Button>
                    </a>
                </div>
            </section>
            {/***
             Case Study Section
             ***/}
            <section className="flex flex-col lg:px-20 xs:px-10 px-4 lg:pb-20 xs:pb-10 pb-4 gap-6">
                <h1 className="font-black sm:text-5xl xs:text-3xl text-2xl">Case Studies</h1>
                <desc className="font-inconsolata">Some description about case studies lorem ipsum dolor sit amet,
                    consectetur
                    adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </desc>
                <div className="bg-white flex flex-col gap-4 place-items-center">
                    {caseStudies.map((caseStudy, index) => (
                        <CaseStudyPreview title={caseStudy.title} description={caseStudy.description}
                                          image={caseStudy.image} link={caseStudy.link} key={index}
                                          reverse={index % 2 === 0}
                        />))}
                    <a href={"/case-studies"} className="w-fit sm:col-span-2">
                        <Button className="!bg-secondary text-white hover:!bg-secondary-light px-8">
                            View All
                        </Button>
                    </a>
                </div>
            </section>
            {/***
             Testimonials Section
             ***/}
            <section className="">
                <div className="lg:px-20 xs:px-10 px-4">
                    <h1 className="font-black sm:text-5xl xs:text-3xl text-2xl">Testimonials</h1>
                    <desc className="font-inconsolata">Some description
                        about
                        testimonials lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </desc>
                </div>
                <div
                    className="bg-white flex flex-row gap-4 my-10 overflow-x-hidden select-none cursor-grab active:cursor-grabbing"
                    ref={containerRef}>
                    {
                        testimonials.map((testimonial, index) => (
                            <Testimonial company={testimonial.company} description={testimonial.description}
                                         name={testimonial.name} title={testimonial.title} key={index}/>
                        ))
                    }
                </div>
            </section>
            {/***
             Contact Us Section
             ***/}
            <section
                className="lg:px-20 xs:px-10 px-4 lg:pb-20 xs:pb-10 pb-4 flex flex-col justify-center items-center gap-4">
                <h1 className="font-black sm:text-5xl xs:text-3xl text-2xl p-0.5">How can we help you?</h1>
                <div className="w-full flex flex-row">
                    <label
                        className="font-inconsolata tsm:text-2xl xs:text-xl text-lg">Name:&nbsp;</label>
                    <input type="text"
                           className="w-full border border-x-0 border-t-0 border-secondary focus:outline-0 rounded-none"/>
                </div>
                <div className="w-full flex flex-row">
                    <label
                        className="font-inconsolata tsm:text-2xl xs:text-xl text-lg whitespace-nowrap">Business
                        Email:&nbsp;</label>
                    <input type="text"
                           className="w-full border border-x-0 border-t-0 border-secondary focus:outline-0 rounded-none"/>
                </div>
                <div className="w-full flex flex-row">
                    <label
                        className="font-inconsolata tsm:text-2xl xs:text-xl text-lg">Phone:&nbsp;</label>
                    <input type="text"
                           className="w-full border border-x-0 border-t-0 border-secondary focus:outline-0 rounded-none"/>
                </div>
                <Button className="self-start px-8 mt-4">Submit</Button>
            </section>
        </Layout>
    );
}