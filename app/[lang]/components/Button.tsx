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
            className={`bg-primary dark:bg-black hover:dark:bg-slate-800 text-white font-black capitalize tracking-tight px-2 py-2 hover:bg-primary-dark transition-all ${
                className
            }`} onClick={onClick} type={type} {...props}>{children}
        </button>
    )
}