import Technology from "./Technology";

export default function TechnologiesIntro({
                                              technologies,
                                              title,
                                              description,
                                          }: {
    technologies: {
        logo: string,
        name: string,
        description: string,
        readMoreUrl: string
        buttonText: string
    }[],
    title: string,
    description: string,
}) {
    return (
        <section
            className="bg-white dark:bg-slate-800 flex flex-col gap-4 lg:p-20 xs:p-10 p-4 relative pb-0 lg:pb-0 xs:pb-0">
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
            <div className="w-full h-full bg-white dark:bg-slate-950  z-10 p-6 flex flex-col gap-4">
                <h1 className="sm:text-5xl xs:text-3xl text-2xl font-black">
                    {title}
                </h1>
                <h2 className="sm:text-xl xs:text-md text-sm font-bold">{description}</h2>
                <div className="gap-4 mt-8 grid-cols-3 grid">
                    {
                        technologies.map((technology, index) => (
                            <Technology {...technology} key={index}/>
                        ))
                    }
                </div>
            </div>
        </section>

    )
}