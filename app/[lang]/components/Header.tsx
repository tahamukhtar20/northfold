import {TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin, TiSocialTwitter,} from 'react-icons/ti'
import logo from "@/public/Logo.png";
import Image from "next/image";
import Link from "next/link";
import {getDictionary} from "@/lib/dictionary";
import {NewsTicker} from "@/app/[lang]/components/NewsTicker";
import {HamburgerMenu} from "@/app/[lang]/components/HamburgerMenu";
import NavLinks from "@/app/[lang]/components/NavLinks";
import {Locale} from "@/i18n.config";
import ThemeButton from '@/app/[lang]/components/ThemeButton'
import LangDropDown from "@/app/[lang]/components/LangDropDown";


export default async function Header(
    {
        lang
    }: {
        lang: Locale
    }
) {
    const {header}: any = await getDictionary(lang)
    const anchors: { name: string; url: string; }[] = header["anchors"]
    const socialMediaLinks: { icon: JSX.Element, url: string }[] = [
        {icon: <TiSocialLinkedin/>, url: 'https://www.linkedin.com'},
        {icon: <TiSocialFacebook/>, url: 'https://www.facebook.com'},
        {icon: <TiSocialInstagram/>, url: 'https://www.instagram.com'},
        {icon: <TiSocialTwitter/>, url: 'https://www.twitter.com'},
    ];
    const news = header["news"]
    return (
        <header className="bg-blue-100 dark:bg-black max-h-28 text-sm z-50">
            <div
                className="h-10 flex-row items-center dark:border-b-slate-900 border-b-gray-200 border border-x-0 border-t-0 px-20 w-full justify-between xl:flex hidden z-50"
                id="header-top">
                <NewsTicker news={news}/>
                <ul className="h-full flex flex-row">
                    {socialMediaLinks.map((socialMediaLink: {
                        icon: JSX.Element;
                        url: string;
                    }, index: number) => (
                        <li key={index} className="mr-4 h-full w-10 flex">
                            <Link href={socialMediaLink.url}
                                  className="flex h-full w-full transition-all [&>svg]:w-full [&>svg]:h-full [&>svg]:text-secondary
                                  [&>svg]:dark:text-gray-200 [&>svg]:hover:text-primary-dark
                           [&>svg]:opacity-60 p-1.5 ">{socialMediaLink.icon}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <nav
                className="flex items-center justify-between flex-wrap h-[4.5rem] z-50 w-full bg-gray-100 dark:bg-slate-800"
                id="header-bottom">
                <div className="flex flex-col items-center xl:hidden w-full pt-1">
                    <div className="flex flex-row justify-between w-full lg:px-20 md:px-14 sm:px-10 px-6">
                        <div className="flex items-center">
                            <Link className="w-16" href={"/"}>
                                <Image src={logo} alt="logo" width="64" height="64"/>
                            </Link>
                        </div>
                        <div className="flex flex-row items-center">
                            <LangDropDown lang={lang}/>
                            <ThemeButton/>
                            <HamburgerMenu/>
                        </div>
                    </div>
                    <div className="justify-center items-center w-full h-fit bg-gray-100 px-20 z-50 dark:bg-slate-800">
                        <div className="hidden" id="menu">
                            <NavLinks anchors={anchors} orientation={"vertical"} lang={lang}/>{/*vertical menu*/}
                        </div>
                    </div>
                </div>
                <div className="xl:flex hidden items-center justify-between flex-wrap pl-20">
                    <Link href={"/"} className="w-16">
                        <Image src={logo} alt="logo" width="50" height="50"/>
                    </Link>
                </div>
                <div className="flex-row h-full items-center xl:flex hidden pr-20">
                    <NavLinks anchors={anchors} orientation={"horizontal"} lang={lang}/>{/*horizontal menu*/}
                    <div className="w-fit h-fit flex flex-row mb-1">
                        <ThemeButton/>
                        <LangDropDown lang={lang}/>
                    </div>

                </div>
            </nav>
        </header>
    )
}

