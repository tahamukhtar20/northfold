export default function Hero({text, tagline, image}: { text: string, tagline?: string, image?: string }) {
    return (
        <div
            className="xl:h-[calc(100vh-7rem)] h-[calc(100vh-2.5rem)] max-h-[90rem] relative flex items-center justify-start overflow-clip lg:px-20 xs:px-10 px-4"
            style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
            <div className="absolute bg-primary-dark opacity-40 h-full w-64 -skew-x-[20deg] top-0 right-[16%] z-0"/>
            <div
                className="text-secondary-light dark:text-gray-200 sm:text-5xl xs:text-3xl text-2xl uppercase font-extrabold z-10">
                <h1 className="tracking-tight w-fit text-secondary-dark dark:bg-slate-600 bg-tertiary-light py-0.5 px-1 dark:text-white">{tagline}</h1>
                <h2 className="max-w-3xl flex-wrap flex [&>*]:bg-tertiary-light [&>*]:dark:bg-slate-600 [&>*]:py-0.5 [&>*]:px-1">{
                    text.split(" ").map((word: string, index: number) => (
                        <span key={index} className="w-fit">{word}&nbsp;</span>
                    ))
                }</h2>
            </div>
        </div>
    );
}