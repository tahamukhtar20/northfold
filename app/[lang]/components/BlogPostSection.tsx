import Button from "@/app/[lang]/components/Button";
import BlogPreview from "@/app/[lang]/components/BlogPreview";
import Link from "next/link";

export default function BlogPostSection(
    {
        title,
        description,
        buttonLabel,
        blogPosts
    }: {
        title: string,
        description: string,
        buttonLabel: string,
        blogPosts: {
            title: string,
            tagLine: string,
            link: string,
            description: string,
        }[]
    }
) {
    return (
        <section
            className="flex flex-col lg:px-20 xs:px-10 px-4 lg:pb-20 xs:pb-10 pb-4 gap-6 bg-white dark:bg-slate-800">
            <h1 className="font-semibold sm:text-5xl xs:text-3xl text-2xl">{title}</h1>
            <h3 className="">{description}</h3>
            <div className="grid sm:grid-cols-2 gap-4 place-items-center">
                {blogPosts.map((blogPost, index) => (
                    <BlogPreview title={blogPost.title} tagLine={blogPost.tagLine}
                                 description={blogPost.description} link={blogPost.link} key={index}/>))}
                <Link href={"/blog"} className="w-fit sm:col-span-2" prefetch={true}>
                    <Button
                        className="!bg-secondary dark:!bg-black hover:dark:!bg-gray-700 text-white hover:!bg-secondary-light px-8">
                        {buttonLabel}
                    </Button>
                </Link>
            </div>
        </section>
    )
}