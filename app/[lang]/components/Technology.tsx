import Button from "./Button";
import Image from "next/image";

export default function Technology({
                                       logo,
                                       name,
                                       description,
                                       readMoreUrl,
                                       buttonText
                                   }: {
    logo: string,
    name: string,
    description: string,
    readMoreUrl: string,
    buttonText: string

}) {
    return (
        <div className="bg-slate-300 dark:bg-slate-700">
            <div className="flex flex-col justify-center items-center gap-4 p-4">
                <div className="flex flex-row items-center justify-between w-full">
                    <Image src={logo} alt="" className="object-contain" width={80} height={80}/>
                    <h1 className="font-semibold dark:text-gray-200 text-slate-900 sm:text-2xl xs:text-xl text-lg uppercase">
                        {name}
                    </h1>
                </div>
                <p className="">{description}</p>
                <a className="w-fit self-start" href={readMoreUrl}>
                    <Button
                        className="bg-transparent hover:bg-secondary-light dark:!text-gray-200 !text-secondary-dark hover:!text-white">
                        {buttonText}
                    </Button>
                </a>
            </div>
        </div>
    )
}