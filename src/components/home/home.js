import Slideshow from "./slideshow";
import Places from "./places";
import Highlights from "./highlights";

const Home = () => {
    document.title = "Home";
    return (
        <section id="home">
            <Slideshow/>
            <Places/>
            <Highlights/>
        </section>
    )
}

export default Home;