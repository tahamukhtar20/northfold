import Hero from "@/app/[lang]/components/Hero";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import CaseStudySection from "@/app/[lang]/components/CaseStudySection";

export default async function Page(
    {params: {lang}}: {
        params: { lang: Locale }
    }
) {
    const {caseStudies}: any = await getDictionary(lang)
    return (
        <>
            <Hero{...caseStudies["hero"]}/>
            <CaseStudySection {...caseStudies["case-study-section"]}/>
        </>
    )
}