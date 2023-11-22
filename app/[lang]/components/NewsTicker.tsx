"use client";
import {useEffect, useState} from "react";
import {FaArrowRight} from "react-icons/fa";

export const NewsTicker = ({news}: { news: string[] }) => {
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

    // animation for top header disappearing after scrolling down
    useEffect(() => {
        const handleScroll = () => {
            const headerBottom = document.getElementById('header-bottom');

            if (window.scrollY > 50) {
                headerBottom?.classList.add('fixed', 'top-0', 'left-0');
            } else {
                headerBottom?.classList.remove('fixed', 'top-0', 'left-0');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-row justify-center items-center text-secondary opacity-60 dark:text-gray-200">
            <FaArrowRight/>
            <ul className="flex flex-col ml-4">
                {news.map((newsItem, index) => (
                    <li key={index}
                        className={`mr-4 h-full flex justify-center items-center ${animationStarted && active === index ? "active__news" : "hidden"}`}>
                        <span className="font-extrabold text-gray-900 dark:text-gray-200 uppercase">News! </span>
                        <span className="flex h-full w-full p-1.5">{newsItem}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};