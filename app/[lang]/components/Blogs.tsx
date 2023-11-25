"use client";
import {useState, useEffect} from "react";
import BlogPreview from "@/app/[lang]/components/BlogPreview";

export default function Blogs({
                                  blogs
                              }: {
    blogs: {
        "title": string,
        "tagLine": string,
        "description": string,
        "link": string,
        "category": string
        "archived": boolean
    }[]
}) {
    const categories: Set<string> = new Set([...blogs.map(blog => blog.category)]);
    const [selectedCategory, setSelectedCategory] = useState<string>(Array.from(categories)[0]);
    const [showArchived, setShowArchived] = useState<boolean>(false);
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    useEffect(() => {
        if (showArchived) {
            setFilteredBlogs(blogs.filter(blog => blog.category === selectedCategory && blog.archived));
        } else {
            setFilteredBlogs(blogs.filter(blog => blog.category === selectedCategory && !blog.archived));
        }
    }, [selectedCategory, showArchived, blogs]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleArchiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowArchived(e.target.value === "Archived");
    };

    return (
        <div className="w-full h-fit flex justify-around flex-col items-center lg:px-20 xs:px-10 px-4 mt-10 gap-8 py-8">
            <div className="flex flex-row justify-between w-full">
                <ul className="flex flex-row self-start gap-8 ">
                    {Array.from(categories).map((category, index) => (
                        <li
                            className={`cursor-pointer capitalize p-2 rounded hover:scale-[102%]  ${
                                selectedCategory === category ? "text-primary border-primary border font-bold" : ""
                            }`}
                            key={index}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
                <select
                    defaultValue={"Not Archived"}
                    className="w-fit px-2 capitalize h-10 rounded border-primary border text-primary font-bold"
                    onChange={handleArchiveChange}
                >
                    <option value={"Archived"}>Archived</option>
                    <option value={"Not Archived"}>Not Archived</option>
                </select>
            </div>
            <div className="w-full h-full flex flex-col justify-around items-center">
                <div className="w-full h-full grid lg:grid-cols-3 sm:grid-cols-2 place-items-start gap-4">
                    {filteredBlogs.map((blog: {
                        "title": string,
                        "tagLine": string,
                        "description": string,
                        "link": string,
                        "category": string
                    }, index: number) => (
                        <BlogPreview {...blog} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
