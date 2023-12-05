"use client";
import {i18n, Locale} from "@/i18n.config";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";

export default function LangDropDown({lang}: { lang: Locale }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        i18n.locales.forEach((locale) => {
            router.prefetch(`/${locale}`);
        });
    }, [router]);

    const getFlagEmoji = (languageCode: string) => {
        switch (languageCode) {
            case "en":
                return "🇺🇸";
            case "es":
                return "🇪🇸";
            default:
                return languageCode.toUpperCase();
        }
    };

    const openDropdown = () => setIsOpen(true);
    const closeDropdown = () => setIsOpen(false);

    return (
        <div className="relative flex flex-col items-center justify-center md:px-2 w-full h-full"
             onMouseLeave={closeDropdown}>
            <button
                className="text-black bg-primary-light font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
                onMouseEnter={openDropdown}
            >
                <div className="w-full md:flex hidden flex-row justify-between items-center md:gap-4">
                    {lang}
                    <Image src={"https://picsum.photos/400"} width="20" height="20" className="rounded-full"
                           alt={"image"}/>
                </div>

                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="absolute top-[100%] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {i18n.locales.map((locale) => (
                            <li key={locale}>
                                <Link
                                    href={`/${locale}`}
                                    className={`px-4 py-2 flex flex-row-reverse justify-between hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${locale === lang ? 'font-bold' : ''}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Image src={"https://picsum.photos/400"} width="20" height="20"
                                           className="rounded-full"
                                           alt={"pics"}/> {locale}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
