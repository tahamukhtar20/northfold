import Hero from "@/app/[lang]/components/Hero";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import FeaturedBlog from "@/app/[lang]/components/FeaturedBlog";
import Blogs from "@/app/[lang]/components/Blogs";

export default async function Page({params: {lang}}: {
                                       params: { lang: Locale }
                                   }
) {
    const {blog}: any = await getDictionary(lang)

    return (
        <>
            <Hero  {...blog["hero"]} />
            <FeaturedBlog {...blog["featured-blog"]} />
            <Blogs blogs={blog["blogs"]}/>
        </>
    )
}