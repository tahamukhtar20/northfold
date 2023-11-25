import TimelineDivision from "@/app/[lang]/components/TimelineDivision";
import Profile from "@/app/[lang]/components/Profile";

export default function CompanyIntro({
                                         title,
                                         description,
                                         centerQuote,
                                         timelines,
                                         profiles,
                                         ourVision,
                                         ourAchievements
                                     }: {
    title: string
    description: string
    centerQuote: string
    timelines: {
        title: string
        description: string
        date: string
    }[]
    profiles: {
        image: string
        name: string
        description: string
    }[]
    ourVision: {
        title: string
        description: string
    }
    ourAchievements: {
        title: string
        description: string
    }

}) {
    return (
        <section className="h-full lg:px-20 xs:px-10 px-4 flex items-center flex-col justify-center py-10">
            <div className="flex flex-col gap-4 w-full items-center mb-8">
                <h2 className="sm:text-6xl xs:text-4xl text-3xl max-w-3xl text-center mb-4">"{centerQuote}"</h2>
                <h1 className="sm:text-4xl font-bold xs:text-2xl text-xl text-start self-start">{title}</h1>
                <p className="sm:text-lg text-md text-start">{description}</p>
            </div>
            {timelines.map((timeline, index) => (
                <TimelineDivision key={index} timeline={timeline} direction={index % 2 === 0}/>
            ))}
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8 my-10">
                {profiles.map((profile, index) => (
                    <Profile profile={profile} key={index}/>
                ))}
            </div>
            <div className="w-full flex flex-col gap-4">
                <h1 className="sm:text-4xl font-bold xs:text-2xl text-xl text-start self-start">{ourVision.title}</h1>
                <p className="sm:text-lg text-md text-start">{ourVision.description}</p>
            </div>
            <div className="w-full flex flex-col gap-4 mt-8">
                <h1 className="sm:text-4xl font-bold xs:text-2xl text-xl text-start self-start">{ourAchievements.title}</h1>
                <p className="sm:text-lg text-md text-start">{ourAchievements.description}</p>
            </div>
        </section>
    )
}




