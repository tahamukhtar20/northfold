import {getDictionary} from "@/lib/dictionary";
import {Locale} from "@/i18n.config";
import Hero from "@/app/[lang]/components/Hero";
import ServicesBrief from "@/app/[lang]/components/ServicesBrief";
import ServicesSummarySection from "@/app/[lang]/components/ServicesSummarySection";
import BlogPostSection from "@/app/[lang]/components/BlogPostSection";
import CaseStudySection from "@/app/[lang]/components/CaseStudySection";
import TestimonialSection from "@/app/[lang]/components/TestimonialSection";
import ContactSection from "@/app/[lang]/components/ContactSection";
import Link from "next/link";
import {TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin, TiSocialTwitter} from "react-icons/ti";

export default async function Page({
                                       params: {lang}
                                   }: {
    params: { lang: Locale }
}) {
    const {home}: any = await getDictionary(lang)
    const socialMediaLinks: { icon: JSX.Element, url: string }[] = [
        {icon: <TiSocialLinkedin/>, url: 'https://www.linkedin.com'},
        {icon: <TiSocialFacebook/>, url: 'https://www.facebook.com'},
        {icon: <TiSocialInstagram/>, url: 'https://www.instagram.com'},
        {icon: <TiSocialTwitter/>, url: 'https://www.twitter.com'},
    ];
    return (
        <>
            <Hero{...home["hero"]}/>
            <ServicesBrief {...home["services-brief"]}/>
            <ServicesSummarySection {...home["services-summary-section"]}/>
            <BlogPostSection {...home["blog-post-section"]}/>
            <CaseStudySection {...home["case-study-section"]}/>
            <TestimonialSection {...home["testimonial-section"]}/>
            <div className="w-full flex flex-col lg:flex-row mb-4">
                <div
                    className="w-full gap-8 flex flex-col my-8 lg:px-20 xs:px-10 px-4 lg:pb-20 xs:pb-10 pb-4">
                    <div className="flex flex-col gap-4 py-5">
                        <h1 className="sm:text-5xl xs:text-3xl text-2xl font-semibold capitalize">{home.title}</h1>
                        <h2 className="sm:text-xl xs:text-md text-sm font-semibold">{home.description}
                        </h2>
                    </div>
                    <ul className="flex flex-col pb-8 max-w-xl gap-2">
                        <li>{home.address}</li>
                        <li>{home.email}</li>
                        <li>{home.phone}</li>
                    </ul>
                    <ul className="flex flex-row">
                        {socialMediaLinks.map((socialMediaLink: {
                            icon: JSX.Element;
                            url: string;
                        }, index: number) => (
                            <li key={index} className="mr-4 h-full w-10 flex">
                                <Link href={socialMediaLink.url} prefetch={true}
                                      className="flex h-full w-full transition-all [&>svg]:w-full [&>svg]:h-full [&>svg]:text-secondary
                                  [&>svg]:dark:text-gray-200 [&>svg]:hover:text-primary-dark
                           [&>svg]:opacity-60 p-1.5 ">{socialMediaLink.icon}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full">
                    <ContactSection {...home["contact-section"]}/>
                </div>
            </div>
        </>
    )
}