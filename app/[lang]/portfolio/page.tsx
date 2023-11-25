import Hero from "@/app/[lang]/components/Hero";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import FeaturedBlog from "@/app/[lang]/components/FeaturedBlog";
import Blogs from "@/app/[lang]/components/Blogs";
import React from "react";
import Projects from "@/app/[lang]/components/Projects";

export default async function Page({params: {lang}}: {
                                       params: { lang: Locale }
                                   }
) {
    const {portfolio}: any = await getDictionary(lang)

    return (
        <>
            <Hero  {...portfolio["hero"]} />
            <Projects projects={portfolio["projects"]} buttonText={portfolio["buttonText"]}/>

        </>
    )
}
