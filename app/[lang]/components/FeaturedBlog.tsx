import Link from "next/link";
import Button from "@/app/[lang]/components/Button";

export default function FeaturedBlog({
                                         title,
                                         description,
                                         image,
                                         link,
                                         buttonText
                                     }: {
    title: string,
    description: string,
    image: string,
    link: string,
    buttonText: string
}) {
    return (
        <section className="w-full h-fit flex flex-col justify-around lg:px-20 xs:px-10 px-4 items-center">
            <div
                className="w-full lg:h-96 md:h-72 h-60 bg-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            ></div>
            <div
                className="h-full w-full bg-secondary-light dark:bg-slate-950 flex items-center relative text-white pt-5">
                <div className="flex items-start justify-center h-full flex-col p-8 gap-8">
                    <h2 className="font-semibold sm:text-4xl xs:text-3xl text-2xl uppercase">{title}</h2>
                    <h3 className=" sm:font-md font-sm">{description}</h3>
                    <div className="w-full">
                        <Link href={link} className="">
                            <Button className="bg-secondary w-1/2 hover:bg-secondary-light">{buttonText}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}