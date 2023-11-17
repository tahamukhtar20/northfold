import Hero from "./components/Hero.tsx";
import Layout from "./components/Layout.tsx";

export default function App() {
    return (
        <div className="">
            <Layout>
                <Hero
                    text="from your software development partner"
                    tagline="#ExpectMore"
                    image="https://picsum.photos/1920"
                />
            </Layout>
        </div>
    );
}