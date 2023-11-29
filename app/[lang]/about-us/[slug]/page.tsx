import {getDictionary} from "@/lib/dictionary";
import {Locale} from "@/i18n.config";
import Image from "next/image";

export default async function Page({
                                       params: {slug, lang},
                                   }: {
    params: {
        slug: string;
        lang: Locale
    };
}) {
    const {slugOne}: any = await getDictionary(lang);


    return (
        <section className="lg:px-20 xs:px-10 px-4 pt-10 relative gap-8 flex flex-col">
            <h1 className="sm:text-5xl xs:text-3xl text-2xl font-extrabold">{slugOne["title"]}</h1>
            <div className="text-start">
                <h2 className="sm:text-xl xs:text-md text-sm font-semibold">{slugOne["subTitle"]}</h2>
                <div>
                    {slugOne["content"].map((item: {
                        type: string;
                        title: string;
                        content: string;
                        image?: string;
                        bulletPoints?: string[];
                    }, index: number) => (
                        item.type === "title-content" ?
                            <TitleContent {...item} key={index}/> :
                            item.type === "title-content-image" ?
                                <TitleContentImage {...item} key={index}/> :
                                item.type === "title-content-bulletPoints" ?
                                    <TitleContentBulletPoints {...item} key={index}/> :
                                    item.type === "title-content-image-bulletPoints" ?
                                        <TitleContentImageBulletPoints {...item} key={index}/> :
                                        null
                    ))}
                </div>
            </div>
        </section>
    );
}

const TitleContent = ({title, content}: {
    title: string;
    content: string;
}) => {
    return (
        <div className="mt-8 gap-4 flex flex-col">
            <h3 className="sm:text-4xl xs:text-2xl text-xl font-black">{title}</h3>
            <p className="sm:text-xl xs:text-lg text-md ">{content}</p>
        </div>
    );
}

const TitleContentImage = ({title, content, image}: {
    title: string;
    content: string;
    image?: string;
}) => {
    return (
        <div className="mt-8 flex flex-row">
            <div className="flex flex-col gap-4">
                <h3 className="sm:text-4xl xs:text-2xl text-xl font-black">{title}</h3>
                <p className="sm:text-xl xs:text-lg text-md ">{content}</p>
            </div>
            <div>
                {image &&
                    <Image
                        alt={"image"}
                        src={image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{width: '100%', height: 'auto'}}
                    />
                }</div>
        </div>
    );
}

const TitleContentBulletPoints = ({title, content, bulletPoints}: {
    title: string;
    content: string;
    bulletPoints?: string[];
}) => {
    return (
        <div className="flex flex-col gap-4 mt-8">
            <h3 className="sm:text-4xl xs:text-2xl text-xl font-black">{title}</h3>
            <p className="sm:text-xl xs:text-lg text-md ">{content}</p>
            <ul className="lg:ml-8 md:ml-4 ml-2 list-disc sm:text-xl xs:text-lg text-md gap-2 flex flex-col">
                {bulletPoints?.map((bulletPoint: string, index: number) => (
                    <li key={index}>{bulletPoint}</li>
                ))}
            </ul>
        </div>
    );
}

const TitleContentImageBulletPoints = ({title, content, image, bulletPoints}: {
    title: string;
    content: string;
    image?: string;
    bulletPoints?: string[];
}) => {
    return (
        <div className="flex flex-col gap-4 mt-8">
            <div className="flex flex-row">
                <div className="flex flex-col gap-4">
                    <h3 className="sm:text-4xl xs:text-2xl text-xl font-black">{title}</h3>
                    <p className="sm:text-xl xs:text-lg text-md ">{content}</p>
                    <ul className="lg:ml-8 md:ml-4 ml-2 list-disc sm:text-xl xs:text-lg text-md gap-2 flex flex-col">
                        {bulletPoints?.map((bulletPoint: string, index: number) => (
                            <li key={index}>{bulletPoint}</li>
                        ))}
                    </ul>
                </div>
                <div className=" flex justify-center items-center">
                    {image &&
                        <Image
                            alt={"image"}
                            src={image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{width: '100%', height: 'auto'}}
                        />
                    }
                </div>
            </div>

        </div>
    );
}