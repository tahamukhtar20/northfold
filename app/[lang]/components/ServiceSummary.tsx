import Button from "./Button";
import Link from "next/link";

const ServiceSummary = ({imageUrl, headline, description, buttonText, buttonUrl, reverse}: {
    imageUrl: string;
    headline: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    reverse?: boolean;
}) => (
    <div className={`flex ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
    } flex-col lg:h-96 h-full shadow-lg`}>
        <div
            className="w-full lg:w-7/12 lg:h-full h-[18rem]"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        ></div>
        <div className="h-full w-full lg:w-5/12 flex items-center gradient-effect">
            <div className="flex items-start justify-center h-full flex-col p-8 gap-8">
                <h2 className="font-semibold sm:text-4xl xs:text-3xl text-2xl uppercase">{headline}</h2>
                <h3 className=" sm:font-md font-sm">{description}</h3>
                <div className="w-full">
                    <Link href={buttonUrl} className="" prefetch={true}>
                        <Button className="bg-secondary w-1/2 hover:bg-secondary-light">{buttonText}</Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default ServiceSummary;