import {getDictionary} from "@/lib/dictionary";
import {Locale} from "@/i18n.config";
import Hero from "@/app/[lang]/components/Hero";
import ServicesBrief from "@/app/[lang]/components/ServicesBrief";
import ServicesSummarySection from "@/app/[lang]/components/ServicesSummarySection";
import BlogPostSection from "@/app/[lang]/components/BlogPostSection";
import CaseStudySection from "@/app/[lang]/components/CaseStudySection";
import TestimonialSection from "@/app/[lang]/components/TestimonialSection";
import ContactSection from "@/app/[lang]/components/ContactSection";

export default async function Page({
                                       params: {lang}
                                   }: {
    params: { lang: Locale }
}) {
    const {home}: any = await getDictionary(lang)
    return (
        <>
            <Hero{...home["hero"]}/>
            <ServicesBrief {...home["services-brief"]}/>
            <ServicesSummarySection {...home["services-summary-section"]}/>
            <BlogPostSection {...home["blog-post-section"]}/>
            <CaseStudySection {...home["case-study-section"]}/>
            <TestimonialSection {...home["testimonial-section"]}/>
            <ContactSection {...home["contact-section"]}/>
        </>
    )
}