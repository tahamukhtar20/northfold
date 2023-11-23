import {quicksand} from "@/app/[lang]/layout";

export default function Hero({text, tagline, image}: { text: string, tagline?: string, image?: string }) {
    return (
        <div
            className="xl:h-[calc(100vh-7rem)] h-[calc(100vh-2.5rem)] max-h-[90rem] relative flex flex-col backdrop-filter items-start justify-around overflow-clip lg:px-20 xs:px-10 px-4 hero-gradient-effect"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

            }}>
            <div
                className={`text-gray-50 uppercase font-bold z-10 tracking-tighter -mt-10 ${
                    quicksand.className
                }`}>
                <h1 className="tracking-tight w-fit py-0.5 px-1 sm:text-7xl xs:text-6xl text-4xl dark:text-white">{tagline}</h1>
                <h2 className="max-w-3xl flex-wrap flex [&>*]:py-0.5 [&>*]:px-1 sm:text-xl xs:text-lg text-md tracking-tighter capitalize">{
                    text.split(" ").map((word: string, index: number) => (
                        <span key={index} className="w-fit">{word}&nbsp;</span>
                    ))
                }</h2>
            </div>
        </div>
    );
}