import CompanyService from "./CompanyService";
import Button from "./Button";
import Link from "next/link";

export default function ServicesBrief({
                                          companyServices,
                                          headline,
                                          subTagline,
                                          lineAboveContact,
                                          buttonLabel
                                      }:
                                          {
                                              companyServices: {
                                                  image: string,
                                                  title: string,
                                                  desc: string,
                                                  link: string
                                              }[],
                                              headline: string
                                              subTagline: string
                                              lineAboveContact: string
                                              buttonLabel: string
                                          }
) {
    return (
        <section className="bg-white flex flex-col gap-4 lg:p-20 xs:p-10 p-4 relative pb-0 lg:pb-0 xs:pb-0">
            <div className="w-1/2 h-full absolute top-0 left-0 pr-3">
                <div className="relative w-full h-full flex flex-row justify-between">
                    <div
                        className="bg-primary-dark opacity-10 w-1/6 h-full "></div>
                    <div
                        className="bg-primary-dark opacity-10 w-1/6 h-full"></div>
                    <div
                        className="bg-primary-dark opacity-10 w-1/6 h-full"></div>
                    <div
                        className="bg-primary-dark opacity-10 w-1/6 h-full"></div>
                    <div
                        className="bg-primary-dark opacity-10 w-1/6 h-full"></div>
                </div>
            </div>
            <div className="w-1/2 h-full absolute top-0 right-0 pl-3">
                <div className="relative w-full h-full flex flex-col justify-between">
                    <div
                        className="bg-tertiary-dark opacity-10 w-full h-1/6"></div>
                    <div
                        className="bg-tertiary-dark opacity-10 w-full h-1/6"></div>
                    <div
                        className="bg-tertiary-dark opacity-10 w-full h-1/6"></div>
                    <div
                        className="bg-tertiary-dark opacity-10 w-full h-1/6"></div>
                    <div
                        className="bg-tertiary-dark opacity-10 w-full h-1/6"></div>
                </div>
            </div>
            <div className="w-full h-full bg-white z-10 p-6 flex flex-col gap-4">
                <h1 className="sm:text-5xl xs:text-3xl text-2xl font-black">
                    {headline}
                </h1>
                <h2 className="sm:text-xl xs:text-md text-sm font-bold">{subTagline}</h2>
                <div className="flex flex-col gap-4 mt-8">
                    {
                        companyServices.map((companyService, index) => (
                            <CompanyService image={companyService.image} title={companyService.title} key={index}
                                            desc={companyService.desc} link={companyService.link}/>
                        ))
                    }
                </div>
            </div>
            <div className="p-4 flex-col flex gap-2">
                <div className="w-full h-full flex flex-row gap-2">
                    <div className="w-2 min-h-full bg-primary-dark"/>
                    <h2 className="sm:text-xl xs:text-md text-sm font-bold">{lineAboveContact}</h2>
                </div>
                <Link className="w-fit z-10 " href={"/contact"}>
                    <Button>
                        {buttonLabel}
                    </Button>
                </Link>
            </div>
        </section>
    )
}