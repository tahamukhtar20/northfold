import TutorialComponent from "./TutorialComponent";

export default function ServicesTutorial({
                                             tutorials,
                                             title
                                         }: {
    title: string;
    tutorials: {
        imageUrl: string,
        headline: string,
        bulletPoints: string[]
    }[]

}) {

    return (
        <section className="bg-white flex flex-col lg:p-20 xs:p-10 p-4 gap-8 lg:pb-0 xs:pb-0 pb-0">
            <h1 className="sm:text-5xl xs:text-3xl text-2xl font-black">{title}</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 place-items-center gap-4">
                {tutorials.map((tutorial, index) => (
                    <TutorialComponent {...tutorial} tutorialsLength={tutorials.length} key={index} idx={index}/>
                ))}
            </div>
        </section>
    )
}