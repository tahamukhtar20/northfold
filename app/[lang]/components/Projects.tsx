import Project from "@/app/[lang]/components/Project";

export default function Projects({
                                     projects,
                                     buttonText,
                                 }: {
    projects: {
        "title": string,
        "description": string,
        link: string,
        technologies: string[],
    }[],
    buttonText: string,
}) {
    return (
        <div>
            {projects.map((project, index) => (
                <Project {...project} key={index}/>
            ))}
        </div>
    )
}