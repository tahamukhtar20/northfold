import Project from "@/app/[lang]/components/Project";
import Button from "@/app/[lang]/components/Button";

export default function Projects({
                                     projects,
                                 }: {
    projects: {
        "title": string,
        "description": string,
        link: string,
        technologies: string[],
    }[],
}) {
    return (
        <section
            className="flex flex-col lg:px-20 xs:px-10 px-4 lg:pb-20 xs:pb-10 pb-4 gap-6 bg-white dark:bg-slate-800">
            <div className="grid sm:grid-cols-2 gap-4 place-items-center">
                {projects.map((project, index) => (
                    <Project title={project.title} technologies={project.technologies} description={project.description}
                             link={project.link} key={index}/>))}
            </div>
        </section>
    )
}