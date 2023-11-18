import quotes from "../assets/double-quotes.svg";

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
        <div className="gradient-diagonal-lines border relative cursor-pointer">
            <div className="absolute top-0 right-0 p-4 px-10">
                <img src={quotes} alt="quote" className="w-8 h-8"/>
            </div>
            <div className=" h-full flex flex-col gap-4 p-4 !w-96">
                <h1 className="sm:text-2xl xs:text-xl text-lg font-black uppercase">{title}</h1>
                <h2 className="sm:text-lg xs:text-md text-sm font-bold text-gray-400 uppercase">{company}</h2>
                <p className="text-sm font-inconsolata">{description}</p>
                <h3 className="text-sm font-bold">{name}</h3>
            </div>
        </div>
    )
}