import Timeline from "@/app/[lang]/components/Timeline";

const TimelineDivision = ({
                              timeline,
                              direction
                          }: {
    timeline: {
        title: string
        description: string
        date: string
    }
    direction: boolean
}) => {
    return (
        <div className="w-full h-96 flex justify-around flex-row items-center">
            {direction &&
                <div
                    className="bg-slate-950 text-white lg:flex hidden h-2/3 w-96 rounded-2xl p-3 flex-col justify-between">
                    <h1>{timeline.title}</h1>
                    <h2>{timeline.description}</h2>
                    <p className="text-end">{timeline.date}</p>
                </div>
            }
            {!direction &&
                <div className="h-2/3 w-96 lg:flex hidden">
                </div>
            }
            <Timeline/>
            <div
                className="bg-slate-950 text-white lg:hidden flex min-h-[2/3] lg:w-96 w-full max-w-2xl rounded-2xl p-3 flex-col justify-between">
                <h1>{timeline.title}</h1>
                <h2>{timeline.description}</h2>
                <p className="text-end">{timeline.date}</p>
            </div>
            {!direction &&
                <div
                    className="bg-slate-950 h-2/3 w-96 text-white lg:flex hidden rounded-2xl p-3 flex-col justify-between">
                    <h1>{timeline.title}</h1>
                    <h2>{timeline.description}</h2>
                    <p className="text-end">{timeline.date}</p>
                </div>
            }
            {direction &&
                <div className="h-2/3 w-96 lg:flex hidden">
                </div>
            }
        </div>
    )
}

export default TimelineDivision