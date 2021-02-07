import Slideshow from "./slideshow";
import Places from "./places";
import Highlights from "./highlights";

const Home = () => {
    document.title = "Home";
    return (
        <section id="home">
            <Slideshow/>
            <div className="container">
                <div className="my-5">
                    <h2 className="text-center mb-4">Our Places</h2>
                    <Places/>
                </div>
                <div className="my-5">
                    <h2 className="text-center mb-0">Explore Our Highlights</h2>
                    <div className="row justify-content-center">
                        <Highlights/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;