import Hero from "@/app/[lang]/components/Hero";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import CompanyIntro from "@/app/[lang]/components/CompanyIntro";

export default async function Page({
                                       params: {lang}
                                   }: {
    params: { lang: Locale }
}) {
    const {aboutUs}: any = await getDictionary(lang)
    return (
        <>
            <Hero {...aboutUs["hero"]} />
            <CompanyIntro {...aboutUs["company-intro"]}/>


        </>
    )
}