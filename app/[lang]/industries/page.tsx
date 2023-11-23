import Hero from "@/app/[lang]/components/Hero";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import IndustriesSection from "@/app/[lang]/components/IndustriesSection";

export default async function Page({params: {lang}}: {
                                       params: { lang: Locale }
                                   }
) {
    const {industries}: any = await getDictionary(lang)

    return (
        <>
            <Hero  {...industries["hero"]} />
            <IndustriesSection {...industries["industries-section"]} />
        </>
    )
}