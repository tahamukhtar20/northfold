import Button from "./Button.tsx";

export default function Technology({
                                       logo,
                                       name,
                                       description,
                                       readMoreUrl
                                   }: {
    logo: string,
    name: string,
    description: string,
    readMoreUrl: string
}) {
    return (
        <div className="bg-slate-300">
            <div className="flex flex-col justify-center items-center gap-4 p-4">
                <div className="flex flex-row items-center justify-between w-full"><img src={logo} alt=""
                                                                                        className="w-20 h-20 object-contain"/>
                    <h1 className="font-black text-slate-900 sm:text-2xl xs:text-xl text-lg uppercase">
                        {name}
                    </h1>
                </div>
                <p className="font-inconsolata">{description}</p>
                <a className="w-fit self-start" href={readMoreUrl}>
                    <Button
                        className="bg-transparent hover:bg-secondary-light !text-secondary-dark hover:!text-white">
                        Read More
                    </Button>
                </a>
            </div>
        </div>
    )
}