import Button from "./Button";
import Link from "next/link";

export default function CompanyService({
                                           image,
                                           desc,
                                           link,
                                           title,
                                       }: {
    image: string;
    desc: string;
    link: string;
    title: string;
}) {
    return (
        <div
            className="w-full sm:flex-row flex-col gap-4 p-4 min-h-48 flex bg-gray-100 hover:scale-[102%] transition-all ease-in-out duration-300 dark:bg-slate-700">
            <div className="w-full justify-center flex">
                <img src={image} alt={title} className="h-full max-h-48"/>
            </div>
            <div className="flex flex-col pl-4 gap-4 justify-between">
                <h1 className="sm:text-2xl xs:text-xl text-lg uppercase font-semibold">{title}</h1>
                <h3 className="">{desc}</h3>
                <Link href={link} className="w-fit z-10" prefetch={true}>
                    <Button className="bg-secondary text-white hover:bg-secondary-light">Learn More</Button>
                </Link>
            </div>
        </div>
    )
}