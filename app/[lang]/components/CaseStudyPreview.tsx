import Button from "./Button";

export default function CaseStudyPreview({
                                             title,
                                             description,
                                             link,
                                             reverse,
                                             image,
                                         }: {
    title: string;
    description: string;
    link: string;
    reverse?: boolean;
    image: string;
}) {
    return (
        <div className={`flex ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } flex-col lg:h-96 h-full w-full shadow-lg`}>
            <div
                className="w-full lg:h-full h-[18rem]"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            ></div>
            <div className="h-full w-full bg-secondary-light flex items-center relative text-white pt-5">
                <h4 className="absolute top-0 right-0 m-5">Case Study</h4>
                <div className="flex items-start justify-center h-full flex-col p-8 gap-8">
                    <h2 className="font-black sm:text-4xl xs:text-3xl text-2xl uppercase">{title}</h2>
                    <desc className="font-inconsolata sm:font-md font-sm">{description}</desc>
                    <div className="w-full">
                        <a href={link} className="">
                            <Button className="bg-secondary w-1/2 hover:bg-secondary-light">Learn More</Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}