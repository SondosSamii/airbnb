import Navbar from "./navbar"
import Places from "./places";
import Slideshow from "./slideshow";

const Home = () => {
    document.title = "Home";
    return (
        <>
          <Navbar/>
          <section id="home">
              <Slideshow/>
              <Places/>
          </section>
        </>
    )
}

export default Home;