import Navbar from "./navbar"
import Slideshow from "./slideshow";

const Home = () => {
    document.title = "Home";
    return (
        <>
          <Navbar/>
          <section id="home">
              <Slideshow/>
          </section>
        </>
    )
}

export default Home;