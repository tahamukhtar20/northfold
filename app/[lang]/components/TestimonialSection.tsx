"use client";
import {useEffect, useRef} from "react";
import Testimonial from "@/app/[lang]/components/Testimonial";

export default function TestimonialSection(
    {
        title,
        description,
        testimonials
    }: {
        title: string,
        description: string,
        testimonials: {
            company: string,
            description: string,
            name: string,
            title: string
        }[]
    }
) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef?.current;

        if (container) {
            let scrollInterval: any | undefined = undefined;
            let isDragging = false;
            let startX = 0;
            let scrollLeft = 0;

            const scrollWidth = container.scrollWidth;
            const containerWidth = container.clientWidth;

            const scroll = () => {
                if (!isDragging) {
                    if (container.scrollLeft < scrollWidth - containerWidth) {
                        container.scrollLeft += 1;
                    } else {
                        container.scrollLeft = 0;
                    }
                }
            };

            const startScroll = () => {
                clearInterval(scrollInterval);
                scrollInterval = setInterval(scroll, 50);
            };

            const pauseScroll = () => {
                clearInterval(scrollInterval);
                scrollInterval = undefined;
            };

            const handleMouseDown = (e: MouseEvent) => {
                isDragging = true;
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
                pauseScroll();
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
            };

            const handleMouseUp = () => {
                isDragging = false;
            };

            const handleTouchStart = (e: TouchEvent) => {
                isDragging = true;
                startX = e.touches[0].pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
                pauseScroll();
            };

            const handleTouchMove = (e: TouchEvent) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.touches[0].pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
            };

            const handleTouchEnd = () => {
                isDragging = false;
            };

            container.addEventListener('mouseenter', pauseScroll);
            container.addEventListener('mouseleave', startScroll);

            container.addEventListener('mousedown', handleMouseDown);
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseup', handleMouseUp);
            container.addEventListener('mouseleave', handleMouseUp);

            container.addEventListener('touchstart', handleTouchStart);
            container.addEventListener('touchmove', handleTouchMove);
            container.addEventListener('touchend', handleTouchEnd);
            container.addEventListener('touchcancel', handleTouchEnd);

            startScroll();

            return () => {
                clearInterval(scrollInterval);

                container.removeEventListener('mouseenter', pauseScroll);
                container.removeEventListener('mouseleave', startScroll);

                container.removeEventListener('mousedown', handleMouseDown);
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseup', handleMouseUp);
                container.removeEventListener('mouseleave', handleMouseUp);

                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
                container.removeEventListener('touchcancel', handleTouchEnd);
            };
        }
    }, []);
    return (
        <section className="bg-white dark:bg-slate-800">
            <div className="lg:px-20 xs:px-10 px-4">
                <h1 className="font-semibold sm:text-5xl xs:text-3xl text-2xl mb-8">{title}</h1>
                <h3 className="">{description}
                </h3>
            </div>
            <div
                className="bg-white dark:bg-slate-800 flex flex-row gap-4 my-10 overflow-x-hidden select-none cursor-grab active:cursor-grabbing"
                ref={containerRef}>
                {
                    testimonials.map((testimonial, index) => (
                        <Testimonial {...testimonial} key={index}/>
                    ))
                }
            </div>
        </section>
    )
}