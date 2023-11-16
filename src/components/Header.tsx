import {
    TiSocialFacebook,
    TiSocialTwitter,
    TiSocialInstagram,
    TiSocialLinkedin,
} from 'react-icons/ti'
import {FaArrowRight} from "react-icons/fa";
import {useEffect, useState} from "react";
import logo from "../assets/TemporaryLogo.png";


const NewsTicker = ({news}: { news: string[] }) => {
    const [active, setActive] = useState(0);
    const [animationStarted, setAnimationStarted] = useState(false);
    useEffect(() => {
        setAnimationStarted(true);
        const interval = setInterval(
            () => setActive((prev) => prev === news.length - 1 ? 0 : prev + 1),
            3000
        );
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex flex-row justify-center items-center text-secondary opacity-60">
            <FaArrowRight/>
            <ul className="flex flex-col ml-4">
                {news.map((newsItem, index) => (
                    <li key={index}
                        className={`mr-4 h-full flex ${animationStarted && active === index ? "active__news" : "hidden"}`}>
                        <span className="flex h-full w-full p-1.5">{newsItem}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function Header() {
    const anchors: string[] = [
        "home",
        "services",
        "technologies",
        "case studies",
        "industries",
        "blog",
        "about us",
        "portfolio",
        "contact"]
    const socialMediaLinks: { icon: JSX.Element, url: string }[] = [
        {icon: <TiSocialLinkedin/>, url: 'https://www.linkedin.com'},
        {icon: <TiSocialFacebook/>, url: 'https://www.facebook.com'},
        {icon: <TiSocialInstagram/>, url: 'https://www.instagram.com'},
        {icon: <TiSocialTwitter/>, url: 'https://www.twitter.com'},
    ];
    const isActive = (path: string) => {
        if (path === "home") {
            return location.pathname === "/" || location.pathname === "/home";
        }
        if (path.includes(" ")) {
            return location.pathname === "/" + path.replace(" ", "%20");
        }
        return location.pathname === "/" + path;
    };
    const news: string[] = [
        "Its going to rain tomorrow",
        "this is some dummy news",
        "this is some more dummy news"
    ]
    const handleHamburgerToggle = () => {
        document.getElementById("hamburger")?.classList.toggle("is-active")
        document.getElementById("menu")?.classList.toggle("hidden")
    }
    const hamburgerMenu = (
        <div className="flex flex-col items-center xl:hidden w-full pt-1">
            <div className="flex flex-row justify-between w-full lg:px-20 md:px-14 sm:px-10 px-6">
                <div className="flex items-center">
                    <div className="w-16">
                        <img src={logo} alt="logo"/>
                    </div>
                </div>
                <div className="three col cursor-pointer !w-fit" onClick={handleHamburgerToggle}>
                    <div className="hamburger w-fit" id="hamburger">
                        <span className="line bg-secondary"></span>
                        <span className="line bg-secondary"></span>
                        <span className="line bg-secondary"></span>
                    </div>
                </div>
            </div>
            <div className="justify-center items-center w-full h-fit bg-gray-100 px-20">
                <div className="hidden" id="menu">
                    <ul className="flex flex-col">
                        {anchors.map((anchor: string, index: number) => (
                            <li key={index} className="text-center flex items-center justify-center pb-4">
                                <a className={`capitalize hover:text-primary ${
                                    isActive(anchor.toLowerCase()) ?
                                        "font-extrabold text-primary" :
                                        "text-black"
                                } ${
                                    anchor.toLowerCase() === "contact" ?
                                        "border border-gray-500 flex text-center py-0.5 px-2" :
                                        ""
                                }`}
                                   href={anchor.toLowerCase() === "home" ? "/" : anchor.toLowerCase()}>{anchor}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
    const nonHamburgerMenu = (
        <>
            <div className="xl:flex hidden items-center justify-between flex-wrap pl-20">
                <div className="w-16">
                    <img src={logo} alt="logo"/>
                </div>
            </div>
            <div className="flex-row h-full items-center xl:flex hidden pr-20">
                <ul className="flex flex-row">
                    {anchors.map((anchor: string, index: number) => (
                        <li key={index} className="ml-8 text-center flex items-center justify-center">
                            <a className={`capitalize hover:text-primary ${
                                isActive(anchor.toLowerCase()) ?
                                    "font-extrabold text-primary" :
                                    "text-black"
                            } ${
                                anchor.toLowerCase() === "contact" ?
                                    "border border-gray-500 flex text-center py-0.5 px-2" :
                                    ""
                            }`}
                               href={anchor.toLowerCase() === "home" ? "/" : anchor.toLowerCase()}>{anchor}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )

    const headerTop = (
        <div
            className="h-10 flex-row items-center border-b-gray-200 border border-x-0 border-t-0 px-20 w-full justify-between xl:flex hidden">
            <NewsTicker news={news}/>
            <ul className="h-full flex flex-row">
                {socialMediaLinks.map((socialMediaLink: {
                    icon: JSX.Element;
                    url: string;
                }, index: number) => (
                    <li key={index} className="mr-4 h-full w-10 flex">
                        <a href={socialMediaLink.url}
                           className="flex h-full w-full [&>svg]:w-full [&>svg]:h-full [&>svg]:text-secondary
                           [&>svg]:opacity-60 p-1.5 ">{socialMediaLink.icon}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
    const headerBottom = (
        <nav className="flex items-center justify-between flex-wrap h-[4.5rem]">
            {hamburgerMenu}
            {nonHamburgerMenu}
        </nav>
    )
    return (
        <header className="bg-gray-100 max-h-28 text-sm">
            {headerTop}
            {headerBottom}
        </header>
    )
}