import Link from "next/link";
import Button from "@/app/[lang]/components/Button";

export default function Project({
                                    title, description, link, technologies,
                                }: {
    title: string,
    description: string,
    link: string,
    technologies: string[],
}) {
    return (
        <div className="bg-gray-100 w-full h-full p-8 flex flex-col gap-4 dark:bg-slate-700">
            <h1 className="sm:text-2xl xs:text-xl text-lg font-semibold uppercase">{title}</h1>
            <p className="text-sm ">{description}</p>
            <ul className="flex flex-wrap gap-2">
                {technologies.map((technology, index) => (
                    <li className="bg-gray-200 dark:bg-slate-600 px-2 py-1 rounded-md" key={index}>{technology}</li>
                ))}
            </ul>
            <Link href={link} className="self-end" prefetch={true}>
                <Button
                    className="!bg-transparent !text-secondary hover:!bg-gray-300 dark:!text-gray-200 hover:dark:!text-slate-900">
                    Read More
                </Button>
            </Link>
        </div>
    )
}