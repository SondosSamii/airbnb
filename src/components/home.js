import Navbar from "./navbar"
import Slideshow from "./slideshow";

const Home = ()=> {
    document.title = "Home";
    return (
        <section id="home">
          <Navbar/>
          <Slideshow/>
        </section>
    )
}

export default Home;