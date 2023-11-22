import Button from "@/app/[lang]/components/Button";

export default function ContactSection(
    {
        title,
        nameTitle,
        emailTitle,
        phoneTitle,
        buttonLabel,
    }: {
        title: string,
        nameTitle: string,
        emailTitle: string,
        phoneTitle: string,
        buttonLabel: string,
    }
) {
    return (
        <section
            className="lg:px-20 xs:px-10 px-4 lg:pb-20 xs:pb-10 pb-4 flex flex-col bg-white dark:bg-slate-800 justify-center items-center gap-4">
            <h1 className="font-black sm:text-5xl xs:text-3xl text-2xl p-0.5">{
                title
            }</h1>
            <div className="w-full flex flex-row">
                <label
                    className="font-inconsolata tsm:text-2xl xs:text-xl text-lg">{nameTitle}</label>
                <input type="text"
                       className="w-full border border-x-0 border-t-0 border-secondary focus:outline-0 rounded-none bg-transparent"/>
            </div>
            <div className="w-full flex flex-row">
                <label
                    className="font-inconsolata tsm:text-2xl xs:text-xl text-lg whitespace-nowrap">{emailTitle}</label>
                <input type="text"
                       className="w-full border border-x-0 border-t-0 border-secondary focus:outline-0 rounded-none bg-transparent"/>
            </div>
            <div className="w-full flex flex-row">
                <label
                    className="font-inconsolata tsm:text-2xl xs:text-xl text-lg">{phoneTitle}</label>
                <input type="text"
                       className="w-full border border-x-0 border-t-0 border-secondary focus:outline-0 rounded-none bg-transparent"/>
            </div>
            <Button className="self-start px-8 mt-4">{buttonLabel}</Button>
        </section>
    )
}