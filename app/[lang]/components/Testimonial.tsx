import quotes from "@/public/svg/double-quotes.svg";
import Image from "next/image";

export default function Testimonial({
                                        company,
                                        description,
                                        name,
                                        title,
                                    }: {
                                        company: string;
                                        description: string;
                                        name: string;
                                        title: string;
                                    }
) {
    return (
        <div className="gradient-diagonal-lines border relative">
            <div className="absolute top-0 right-0 p-4 px-10">
                <Image src={quotes} alt="quote" width={32} height={32}/>
            </div>
            <div className=" h-full flex flex-col gap-4 p-4 !w-96">
                <h1 className="sm:text-2xl xs:text-xl text-lg font-semibold uppercase">{title}</h1>
                <h2 className="sm:text-lg xs:text-md text-sm font-semibold text-gray-400 uppercase">{company}</h2>
                <p className="text-sm ">{description}</p>
                <h3 className="text-sm font-semibold">{name}</h3>
            </div>
        </div>
    )
}