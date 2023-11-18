// - Footer (across all pages)
// |- Quick Links: Important pages or external resources
// |- Newsletter Signup
// |- Social Media Icons
// |- Terms & Conditions and Privacy Policy links

import Logo from "../assets/TemporaryLogo.png";
import {
    TiSocialFacebook,
    TiSocialTwitter,
    TiSocialInstagram,
    TiSocialLinkedin,
} from 'react-icons/ti'
import Button from "./Button.tsx";

export default function Footer() {
    const anchors: { name: string; url: string; }[] = [
        {name: "home", url: "/"},
        {name: "services", url: "/services"},
        {name: "technologies", url: "/technologies"},
        {name: "case studies", url: "/case-studies"},
        {name: "industries", url: "/industries"},
        {name: "blog", url: "/blog"},
        {name: "about us", url: "/about-us"},
        {name: "portfolio", url: "/portfolio"},
        {name: "contact", url: "/contact"},
    ]
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
                   className="border border-x-0 border-t-0 border-b-gray-200 bg-secondary focus:outline-none focus:border-primary text-white sm:w-80 w-full h-10 px-2"
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
    const termsAndConditonsPrivacyPolicyLinks = (
        <div className="flex flex-col sm:items-end items-start">
            <a href="#" className="text-white hover:text-primary text-sm font-black tracking-wider mb-1.5">Terms and
                Conditions</a>
            <a href="#" className="text-white hover:text-primary text-sm font-black tracking-wider mb-1.5">Privacy
                Policy</a>
        </div>
    )
    return (
        <>
            <footer
                className="sm:flex flex-row justify-between w-full bg-secondary py-10 md:px-20 sm:px-8 px-4 -z-50 hidden ">
                <div className="flex flex-col items-start">
                    <img src={Logo} alt={"logo"} className="w-20 mb-8"/>
                    {quickLinks}
                </div>
                <div className="flex flex-col gap-4 justify-evenly">
                    {newsletterSignup}
                    {termsAndConditonsPrivacyPolicyLinks}
                    {socialMediaIcons}
                </div>
            </footer>
            <footer
                className="flex flex-col justify-between w-full bg-secondary py-10 md:px-20 sm:px-8 px-4 -z-50 sm:hidden">
                <div className="flex flex-col items-start gap-4">
                    <img src={Logo} alt={"logo"} className="w-20 mb-8"/>
                    {newsletterSignup}
                    {socialMediaIcons}
                    {quickLinks}
                    <br/>
                    {termsAndConditonsPrivacyPolicyLinks}
                </div>
                <div className="flex flex-col gap-4 justify-evenly">
                </div>
            </footer>
        </>
    )
}