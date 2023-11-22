"use client";
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function NavLinks({
                                     anchors,
                                     orientation,
                                     lang,
                                 }: {
    anchors: { name: string; url: string }[];
    orientation: 'horizontal' | 'vertical';
    lang: string;
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
        <ul className="flex flex-col">
            {anchors.map((anchor: { name: string; url: string }, index: number) => (
                <li key={index} className="text-center flex items-center justify-center pb-4 z-50">
                    <Link
                        className={`capitalize hover:text-primary ${
                            isActive(anchor.url)
                                ? 'font-extrabold text-primary'
                                : 'text-black'
                        } ${
                            anchor.name.toLowerCase() === 'contact'
                                ? 'border border-gray-500 flex text-center py-0.5 px-2'
                                : ''
                        }`}
                        href={anchor.url}
                    >
                        {anchor.name}
                    </Link>
                </li>
            ))}
        </ul>
    ) : (
        <ul className="flex flex-row">
            {anchors.map((anchor: { name: string; url: string }, index: number) => (
                <li key={index} className="ml-8 text-center flex items-center justify-center">
                    <Link
                        className={`capitalize hover:text-primary ${
                            isActive(anchor.url)
                                ? 'font-extrabold text-primary'
                                : 'text-black'
                        } ${
                            anchor.name.toLowerCase() === 'contact'
                                ? 'border border-gray-500 flex text-center py-0.5 px-2'
                                : ''
                        }`}
                        href={anchor.url}
                    >
                        {anchor.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
