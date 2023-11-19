import {tutorials} from "../temp-data/content.ts";

export default function TutorialComponent(
    {
        imageUrl,
        headline,
        bulletPoints,
        idx
    }:
        {
            imageUrl: string,
            headline: string,
            bulletPoints: string[]
            idx: number
        }
) {

    return (
        <div className={`w-full flex flex-col justify-center items-center p-4 gap-2 max-w-lg ${
            idx === tutorials.length - 1 ? "lg:col-span-1 md:col-span-2" : ""
        }`}>
            <img src={imageUrl} alt="" className="w-full h-52 object-cover"/>
            <h1 className="font-black text-gray-500 sm:text-2xl xs:text-xl text-lg uppercase">
                {headline}
            </h1>
            <ul className="flex flex-col gap-2 font-inconsolata sm:text-xl xs:text-lg text-md">
                {
                    bulletPoints.map((bulletPoint, index) => (
                        <>
                            <li className="flex flex-row gap-2 items-center text-center justify-center" key={index}>
                                <p className="">{bulletPoint}</p>
                            </li>
                            {
                                index !== bulletPoints.length - 1 && (
                                    <div className="rounded-full aspect-square bg-gray-300 w-2 self-center"></div>
                                )
                            }
                        </>
                    ))
                }
            </ul>
        </div>
    )
}