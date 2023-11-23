import Button from "@/app/[lang]/components/Button";
import CaseStudyPreview from "@/app/[lang]/components/CaseStudyPreview";

export default function CaseStudySection(
    {
        title,
        description,
        buttonLabel,
        caseStudies
    }: {
        caseStudies: {
            title: string,
            description: string,
            image: string,
            link: string
        }[]
        title: string
        description: string
        buttonLabel: string
    }
) {
    return (
        <section
            className="flex flex-col lg:px-20 xs:px-10 px-4 lg:pb-20 xs:pb-10 pb-4 gap-6 bg-white dark:bg-slate-800">
            <h1 className="font-semibold sm:text-5xl xs:text-3xl text-2xl">{title}</h1>
            <h3 className="">{description}</h3>
            <div className="flex flex-col gap-4 place-items-center">
                {caseStudies.map((caseStudy, index) => (
                    <CaseStudyPreview {...caseStudy} key={index}
                                      reverse={index % 2 === 0}
                    />))}
                <a href={"/case-studies"} className="w-fit sm:col-span-2">
                    <Button
                        className="!bg-secondary dark:!bg-black hover:dark:!bg-gray-700 text-white hover:!bg-secondary-light px-8">
                        {buttonLabel}
                    </Button>
                </a>
            </div>
        </section>
    )
}