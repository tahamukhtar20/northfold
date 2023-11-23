import {TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin, TiSocialTwitter} from "react-icons/ti";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import {getDictionary} from "@/lib/dictionary";
import Button from "@/app/[lang]/components/Button";
import Image from "next/image";
import {Locale} from "@/i18n.config";

export default async function Footer({
                                         lang
                                     }: {
                                         lang: Locale
                                     }
) {
    const {footer}: any = await getDictionary(lang)
    const anchors: { name: string; url: string; }[] = footer["anchors"]
    const socialMediaLinks: { icon: JSX.Element, url: string }[] = [
        {icon: <TiSocialLinkedin/>, url: 'https://www.linkedin.com'},
        {icon: <TiSocialFacebook/>, url: 'https://www.facebook.com'},
        {icon: <TiSocialInstagram/>, url: 'https://www.instagram.com'},
        {icon: <TiSocialTwitter/>, url: 'https://www.twitter.com'},
    ];
    const quickLinks = (
        <ul>
            {anchors.map((anchor, index) => (
                <li key={index}
                    className="text-slate-900 dark:text-white capitalize hover:text-primary text-sm font-semibold tracking-tighter mb-1.5">
                    <Link prefetch={true} href={anchor.url}>{anchor.name}</Link>
                </li>
            ))}
        </ul>
    )
    const newsletterSignup = (
        <div className="flex sm:flex-row flex-col gap-2">
            <input type="text"
                   className="border border-x-0 border-t-0 border-b-gray-200 bg-secondary focus:outline-none bg-transparent focus:border-primary text-slate-900 dark:text-white sm:w-72 w-full h-10 px-2"
                   placeholder="Email Address"/>
            <Button className="w-fit tracking-tighter">Subscribe</Button>
        </div>
    )
    const socialMediaIcons = (
        <ul className="flex lg:flex-row sm:flex-col justify-end -ml-2">
            {socialMediaLinks.map((socialMediaLink: {
                icon: JSX.Element;
                url: string;
            }, index: number) => (
                <li key={index} className="mr-4 w-10 flex">
                    <Link href={socialMediaLink.url}
                          className="flex w-full [&>svg]:w-full [&>svg]:h-10 [&>svg]:text-slate-900 [&>svg]:dark:text-white tracking-tighter
                           [&>svg]:opacity-60 p-1.5 ">{socialMediaLink.icon}</Link>
                </li>
            ))}
        </ul>
    )
    const termsAndConditionsPrivacyPolicyLinks = (
        <div className="flex flex-col sm:items-end items-start">
            <Link href="#"
                  className="text-slate-900 dark:text-white hover:text-primary text-sm font-semibold mb-1.5 tracking-tighter">Terms
                and
                Conditions</Link>
            <Link href="#"
                  className="text-slate-900 dark:text-white hover:text-primary text-sm font-semibold mb-1.5 tracking-tighter">Privacy
                Policy</Link>
        </div>
    )
    return (
        <>
            <footer
                className="sm:flex flex-row justify-between w-full bg-white py-10 md:px-20 sm:px-8 px-4 -z-50 hidden dark:bg-black">
                <div className="w-full flex justify-between h-full pt-10 border-t-black border border-x-0 border-b-0">
                    <div className="flex flex-col items-start ">
                        <Image src={Logo} alt={"logo"} className="mb-8" height="64" width="64"/>
                        {socialMediaIcons}
                    </div>
                    <div className="">
                        <h1 className="text-2xl pb-4 font-semibold tracking-tighter">Site Map</h1>
                        {quickLinks}
                    </div>
                    <div className="flex flex-col gap-4 justify-evenly">
                        {newsletterSignup}
                        {termsAndConditionsPrivacyPolicyLinks}
                    </div>
                </div>
            </footer>
            <footer
                className="flex flex-col justify-between w-full bg-white py-10 md:px-20 sm:px-8 px-4 -z-50 sm:hidden dark:bg-black tracking-tighter">
                <div
                    className="w-full flex justify-between h-full pt-10 border-t-black border border-x-0 border-b-0 tracking-tighter">
                    <div className="flex flex-col items-start gap-4 tracking-tighter">
                        <Image src={Logo} alt={"logo"} className="mb-8" height="64" width="64"/>
                        {newsletterSignup}
                        {socialMediaIcons}
                        <h1 className="text-2xl pb-4 font-semibold tracking-tighter -mb-4">Site Map</h1>
                        {quickLinks}
                        <br/>
                        {termsAndConditionsPrivacyPolicyLinks}
                    </div>
                    <div className="flex flex-col gap-4 justify-evenly">
                    </div>
                </div>
            </footer>
        </>
    )
}