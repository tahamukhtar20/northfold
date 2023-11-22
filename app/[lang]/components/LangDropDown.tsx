"use client";
import {i18n, Locale} from "@/i18n.config";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function LangDropDown({
                                         lang
                                     }: {
    lang: Locale
}) {
    const router = useRouter();

    const handleChange = (e: any) => {
        const locale = e.target.value;
        if (locale) {
            router.push(`/${locale}`);
        }
    };

    useEffect(() => {
        i18n.locales.forEach((locale) => {
            router.prefetch(`/${locale}`)
        });
    }, [router]);

    return (
        <select
            onChange={handleChange}
            className="bg-transparent dark:text-gray-200 text-secondary-dark dark:bg-slate-800 dark:hover:text-white focus:outline-none"
            defaultValue={lang}
            name="lang"
            id="lang"
        >
            {i18n.locales.map((locale) => (
                <option value={locale} key={locale}>
                    {locale}
                </option>
            ))}
        </select>
    );
}
