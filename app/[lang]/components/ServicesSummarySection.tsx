import ServiceSummary from "./ServiceSummary";

export default function ServicesSummarySection({
                                                   services
                                               }:
                                                   {
                                                       services: {
                                                           imageUrl: string,
                                                           headline: string,
                                                           description: string,
                                                           buttonText: string,
                                                           buttonUrl: string
                                                       }[]
                                                   }) {
    return (
        <section className="bg-white flex flex-col gap-4 lg:p-20 xs:p-10 p-4 dark:bg-slate-800">
            {
                services.map((service, index) => (
                    <div className="static z-10">
                        <ServiceSummary
                            reverse={index % 2 === 0}
                            key={index}
                            imageUrl={service.imageUrl}
                            headline={service.headline}
                            description={service.description}
                            buttonText={service.buttonText}
                            buttonUrl={service.buttonUrl}
                        />
                    </div>
                ))
            }
        </section>
    )
}