import Button from "@/app/[lang]/components/Button";
import BlogPreview from "@/app/[lang]/components/BlogPreview";

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
        <section className="flex flex-col lg:px-20 xs:px-10 px-4 lg:pb-20 xs:pb-10 pb-4 gap-6">
            <h1 className="font-black sm:text-5xl xs:text-3xl text-2xl">{title}</h1>
            <desc className="font-inconsolata">{description}</desc>
            <div className="bg-white grid sm:grid-cols-2 gap-4 place-items-center">
                {blogPosts.map((blogPost, index) => (
                    <BlogPreview title={blogPost.title} tagLine={blogPost.tagLine}
                                 description={blogPost.description} link={blogPost.link} key={index}/>))}
                <a href={"/blog"} className="w-fit sm:col-span-2">
                    <Button className="!bg-secondary text-white hover:!bg-secondary-light px-8">
                        {buttonLabel}
                    </Button>
                </a>
            </div>
        </section>
    )
}