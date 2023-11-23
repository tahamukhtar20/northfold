import Hero from "@/app/[lang]/components/Hero";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import ServicesBrief from "@/app/[lang]/components/ServicesBrief";
import ServicesTutorial from "@/app/[lang]/components/ServicesTutorial";
import ServicesSummarySection from "@/app/[lang]/components/ServicesSummarySection";

export default async function Page(
    {params: {lang}}: {
        params: { lang: Locale }
    }
) {
    const {services}: any = await getDictionary(lang)
    const {title, description, servicesProjects} = services["projects"]
    return (
        <>
            <Hero{...services["hero"]}/>
            <ServicesBrief {...services["services-brief"]} />
            <ServicesTutorial{...services["services-tutorial"]}/>
            <div className=" lg:px-20 xs:px-10 px-4 lg:pt-20 xs:pt-10 pt-4 flex flex-col gap-8 -mb-8">
                <h1 className="font-semibold sm:text-5xl xs:text-3xl text-2xl">{title}</h1>
                <h3 className="sm:text-xl xs:text-md text-sm font-semibold">{description}</h3>
            </div>
            <ServicesSummarySection services={servicesProjects}/>

        </>)
}