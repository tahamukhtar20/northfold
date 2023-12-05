"use client";
export default function Button({
                                   onClick,
                                   children,
                                   type,
                                   className = "",
                                   ...props
                               }: {
    onClick?: () => void;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    props?: unknown;
}) {
    return (
        <button
            className={`bg-primary dark:bg-black hover:dark:bg-slate-800 text-white font-semibold capitalize tracking-tight px-2 py-2 hover:bg-primary-dark transition-all flex text-center rounded rounded-br-2xl rounded-tl-2xl w-fit ${
                className
            }`} onClick={onClick} type={type} {...props}>{children}
        </button>
    )
}