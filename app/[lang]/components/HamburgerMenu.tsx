"use client";

export const HamburgerMenu = () => {
    const handleHamburgerToggle = () => {
        document.getElementById("hamburger")?.classList.toggle("is-active")
        document.getElementById("menu")?.classList.toggle("hidden")
    }

    return (
        <div className="three col cursor-pointer !w-fit"
             onClick={handleHamburgerToggle}
        >
            <div className="hamburger w-fit" id="hamburger">
                <span className="line bg-secondary"></span>
                <span className="line bg-secondary"></span>
                <span className="line bg-secondary"></span>
            </div>
        </div>
    )
}