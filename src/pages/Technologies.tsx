import Layout from "../components/Layout.tsx";
import Hero from "../components/Hero.tsx";
import TechnologiesIntro from "../components/TechnologiesIntro.tsx";
import {technologies} from "../temp-data/content.ts";

export default function Technologies() {
    return (
        <Layout>
            <Hero
                text="Something about Technologies"
                tagline="#Tech"
                image="https://picsum.photos/1920"
            />
            <TechnologiesIntro technologies={technologies} headline={"Technologies"}
                               subTagline={"We are experts in the following technologies:"}/>
            
        </Layout>
    )
}