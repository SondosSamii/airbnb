const baseURL = "http://my-json-server.typicode.com/sondossamii/airbnb/reviews";

const placeReviewsUrl = "https://node-airbnb.herokuapp.com/api/placeReviews";

const reviewUrl = "https://node-airbnb.herokuapp.com/api/review";

export async function getAllReviews() {
    var payload = null;
    try {
        const res = await fetch(baseURL);
        payload = await res.json();
        console.log("Payload of AllReviews Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "AllReviews", payload}
}

export async function getPlaceReviews(id) {
    var payload = null;
    try {
        const res = await fetch(`${placeReviewsUrl}/${id}`);
        payload = await res.json();
        console.log("Payload of All Places Reviews Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "PlaceReviews", payload}
}

export async function getReviewDetails(id) {
    var payload = null;
    try {
        const res = await fetch(`${reviewUrl}/${id}`);
        payload = await res.json();
        console.log("Payload of Review Details Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "ReviewDetails", payload}
}
