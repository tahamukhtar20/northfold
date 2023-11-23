import Button from "./Button";

export default function BlogPreview({tagLine, title, description, link}: {
    title: string;
    tagLine: string;
    description: string;
    link: string;
}) {
    return (
        <div className="bg-gray-100 w-full h-full p-8 flex flex-col gap-4 dark:bg-slate-700">
            <h1 className="sm:text-2xl xs:text-xl text-lg font-semibold uppercase">{title}</h1>
            <h2 className="sm:text-lg xs:text-md text-sm font-semibold text-gray-400 uppercase">{tagLine}</h2>
            <p className="text-sm ">{description}</p>
            <a href={link} className="self-end">
                <Button
                    className="!bg-transparent !text-secondary hover:!bg-gray-300 dark:!text-gray-200 hover:dark:!text-slate-900">
                    Read More
                </Button>
            </a>
        </div>
    )
}