import Navbar from "../navbar";
import Slideshow from "./slideshow";
import Places from "./places";
import Highlights from "./highlights";
import Footer from "../footer";

const Home = () => {
    document.title = "Home";
    return (
        <>
          <Navbar/>
          <section id="home">
              <Slideshow/>
              <Places/>
              <Highlights/>
              <Footer/>
          </section>
        </>
    )
}

export default Home;