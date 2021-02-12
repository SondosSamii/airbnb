const baseURL = "http://my-json-server.typicode.com/sondossamii/airbnb/reviews";

// const placeReviewsUrl = "https://node-airbnb.herokuapp.com/api/placeReviews";
// const reviewUrl = "https://node-airbnb.herokuapp.com/api/review";

const placeReviewsUrl = "http://localhost:8080/api/placeReviews";
const reviewUrl = "http://localhost:8080/api/review";

export async function getAllReviews() {
    let payload = null;
    try {
        let res = await fetch(baseURL);
        payload = await res.json();
        console.log("getAllReviews Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "AllReviews", payload}
}

export async function getPlaceReviews(id) {
    let payload = null;
    try {
        let res = await fetch(`${placeReviewsUrl}/${id}`);
        payload = await res.json();
        console.log("getPlaceReviews Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "PlaceReviews", payload}
}

export async function getReviewDetails(id) {
    let payload = null;
    try {
        let res = await fetch(`${reviewUrl}/${id}`);
        payload = await res.json();
        console.log("getReviewDetails Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "ReviewDetails", payload}
}
