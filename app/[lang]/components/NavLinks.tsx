"use client";
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import ThemeButton from "@/app/[lang]/components/ThemeButton";
import LangDropDown from "@/app/[lang]/components/LangDropDown";
import {Locale} from "@/i18n.config";

export default function NavLinks({
                                     anchors,
                                     orientation,
                                     lang,
                                 }: {
    anchors: { name: string; url: string }[];
    orientation: 'horizontal' | 'vertical';
    lang: Locale;
}) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        const currentLocale = '/' + lang;
        if (path === '/') {
            return pathname === currentLocale;
        }
        return pathname === currentLocale + path;
    };

    return orientation === 'vertical' ? (
        <ul className="flex flex-col ">
            {anchors.map((anchor: { name: string; url: string }, index: number) => (
                <li key={index} className="text-center flex items-center justify-center pb-4 z-50">
                    <Link
                        className={`capitalize  hover:text-primary hover:dark:text-slate-400 ${
                            isActive(anchor.url)
                                ? 'font-extrabold text-primary'
                                : 'text-black dark:text-gray-200'
                        } ${
                            anchor.name.toLowerCase() === 'contact'
                                ? 'border border-gray-500 flex text-center py-0.5 px-2'
                                : ''
                        }`}
                        href={anchor.url} prefetch={true}
                    >
                        {anchor.name}
                    </Link>
                </li>
            ))}
        </ul>
    ) : (
        <ul className="flex flex-row">
            {anchors.map((anchor: { name: string; url: string }, index: number) => (
                <li
                    key={index}
                    className={`ml-8 text-center flex items-center justify-center flex-col group transition-all ${
                        isActive(anchor.url)
                            ? 'hover:scale-[105%] font-extrabold text-primary'
                            : 'hover:scale-[105%] text-black dark:text-gray-200'
                    }`}
                >
                    <Link
                        className={`capitalize hover:text-primary hover:dark:text-slate-400`}
                        href={anchor.url} prefetch={true}
                    >
                        {anchor.name}
                    </Link>
                    <div
                        className={`w-2 h-1 bg-black self-start rounded-full transition-all group-hover:w-full dark:bg-white group-hover:bg-primary 
                        ${
                            isActive(anchor.url)
                                ? '!w-full !bg-primary'
                                : ''
                        }
                        `
                        }
                    ></div>
                </li>
            ))}
        </ul>

    );
}
