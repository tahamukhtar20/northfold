import {getDictionary} from "@/lib/dictionary";
import Hero from "@/app/[lang]/components/Hero";
import TechnologiesIntro from "@/app/[lang]/components/TechnologiesIntro";
import {Locale} from "@/i18n.config";

export default async function Page({
                                       params: {lang}
                                   }:
                                       {
                                           params: { lang: Locale }
                                       }
) {
    const {technologies}: any = await getDictionary(lang);
    return (
        <>
            <Hero {...technologies["hero"]}/>
            <TechnologiesIntro {...technologies["technologiesIntro"]} />
        </>
    )
}