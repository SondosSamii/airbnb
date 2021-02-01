import Navbar from "../navbar"
import Highlights from "./highlights";
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
              <Highlights/>
          </section>
        </>
    )
}

export default Home;