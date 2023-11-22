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
                    className="text-white capitalize hover:text-primary text-sm font-black tracking-wider mb-1.5">
                    <a href={anchor.url}>{anchor.name}</a>
                </li>
            ))}
        </ul>
    )
    const newsletterSignup = (
        <div className="flex sm:flex-row flex-col gap-2">
            <input type="text"
                   className="border border-x-0 border-t-0 border-b-gray-200 bg-secondary focus:outline-none bg-transparent focus:border-primary text-white sm:w-80 w-full h-10 px-2"
                   placeholder="Email Address"/>
            <Button className="w-fit">Subscribe</Button>
        </div>
    )
    const socialMediaIcons = (
        <ul className="flex flex-row justify-end">
            {socialMediaLinks.map((socialMediaLink: {
                icon: JSX.Element;
                url: string;
            }, index: number) => (
                <li key={index} className="mr-4 w-10 flex">
                    <a href={socialMediaLink.url}
                       className="flex w-full [&>svg]:w-full [&>svg]:h-10 [&>svg]:text-primary-light
                           [&>svg]:opacity-60 p-1.5 ">{socialMediaLink.icon}</a>
                </li>
            ))}
        </ul>
    )
    const termsAndConditionsPrivacyPolicyLinks = (
        <div className="flex flex-col sm:items-end items-start">
            <Link href="#" className="text-white hover:text-primary text-sm font-black tracking-wider mb-1.5">Terms and
                Conditions</Link>
            <Link href="#" className="text-white hover:text-primary text-sm font-black tracking-wider mb-1.5">Privacy
                Policy</Link>
        </div>
    )
    return (
        <>
            <footer
                className="sm:flex flex-row justify-between w-full bg-secondary py-10 md:px-20 sm:px-8 px-4 -z-50 hidden dark:bg-black">
                <div className="flex flex-col items-start">
                    <Image src={Logo} alt={"logo"} className="mb-8" height="64" width="64"/>
                    {quickLinks}
                </div>
                <div className="flex flex-col gap-4 justify-evenly">
                    {newsletterSignup}
                    {termsAndConditionsPrivacyPolicyLinks}
                    {socialMediaIcons}
                </div>
            </footer>
            <footer
                className="flex flex-col justify-between w-full bg-secondary py-10 md:px-20 sm:px-8 px-4 -z-50 sm:hidden dark:bg-black">
                <div className="flex flex-col items-start gap-4">
                    <Image src={Logo} alt={"logo"} className="mb-8" height="64" width="64"/>
                    {newsletterSignup}
                    {socialMediaIcons}
                    {quickLinks}
                    <br/>
                    {termsAndConditionsPrivacyPolicyLinks}
                </div>
                <div className="flex flex-col gap-4 justify-evenly">
                </div>
            </footer>
        </>
    )
}