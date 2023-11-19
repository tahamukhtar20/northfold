import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

interface Props {
    children: React.ReactNode
}

export default function Layout({children}: Props) {
    return (
        <>
            <Header/>
            <main className="">{children}</main>
            <Footer/>
        </>
    )
}