import Home from "./pages/Home.tsx";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Services from "./pages/Services.tsx";
import Technologies from "./pages/Technologies.tsx";
import CaseStudies from "./pages/Case-Studies.tsx";
import Industries from "./pages/Industries.tsx";
import Blog from "./pages/Blog.tsx";
import AboutUs from "./pages/About-Us.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import Contact from "./pages/Contact.tsx";

export default function App() {
    const pages: { path: string; component: React.ReactNode }[] = [
        {
            path: "/",
            component: <Home/>,
        },
        {
            path: "/services",
            component: <Services/>,
        },
        {
            path: "/technologies",
            component: <Technologies/>,
        },
        {
            path: "/case-studies",
            component: <CaseStudies/>,
        },
        {
            path: "/industries",
            component: <Industries/>,
        },
        {
            path: "/blog",
            component: <Blog/>,
        },
        {
            path: "/about-us",
            component: <AboutUs/>,
        },
        {
            path: "/portfolio",
            component: <Portfolio/>,
        },
        {
            path: "/contact",
            component: <Contact/>,
        }
    ]
    return (
        <Router>
            <Routes>
                {pages.map((page, index) => (
                    <Route key={index} path={page.path} element={page.component}/>
                ))}
            </Routes>
        </Router>
    );
}