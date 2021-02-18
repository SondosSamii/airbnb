const baseURL = "http://my-json-server.typicode.com/sondossamii/airbnb/reviews";

// const placeReviewsUrl = "https://node-airbnb.herokuapp.com/api/placeReviews";
// const reviewUrl = "https://node-airbnb.herokuapp.com/api/review";

const placeReviewsUrl = "https://node-airbnb.herokuapp.com/api/placeReviews";
const reviewUrl = "https://node-airbnb.herokuapp.com/api/review";
const placeRating_url = "https://node-airbnb.herokuapp.com/api/placeRating";

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
    console.log("yyyyyys");
    let payload = null;
    try {
        let res = await fetch(`${placeReviewsUrl}/${id}`);
        payload = await res.json();
        // console.log("getPlaceReviews Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {
        type: "PlaceReviews",
         payload
        }
}
export async function getPlaceRatings(id) {
    // console.log("yyyyyys");
    let payload = null;
    try {
        let res = await fetch(`${placeRating_url}/${id}`);
        payload = await res.json();
        // console.log("getPlaceReviews Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {
        type: "PlaceRating",
         payload
        }
}

export async function getReviewDetails(id) {
    let payload = null;
    try {
        let res = await fetch(`${reviewUrl}/${id}`);
        payload = await res.json();
        // console.log("getReviewDetails Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "ReviewDetails", payload}
}


// export async function getPlaceReviews(token,id) {
//     var payload = null;
//     try {
//         let url="http://localhost:8080/api/placeReviews/"+id
//         const res = await fetch(url,{
//         method: "GET",
//         headers: {
//         Authorization: 'Bearer ' + token,
//         "Content-Type": "application/json",
//              }})
//         payload = await res.json();
//         console.log("Payload of place reviews Action: ", payload);
//     } catch (err) {
//         console.log(err);
//     }
//     return {type: "PlaceReview", payload}
// }

export async function AllReviews() {
    var payload = null;
    try {
        let url="https://node-airbnb.herokuapp.com/api/allReviews"
        const res = await fetch(url,{
        method: "GET",
        headers: {
        "Content-Type": "application/json",
             }})
        payload = await res.json();
        console.log("Payload of AllReviews Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "Reviews", payload}
}

export async function AddReview(formData,url,token) {
    var payload = null;
    try {
        
        const res = await fetch(url,{
        method: "POST",
        body: formData,
        headers: {
        Authorization: 'Bearer ' + token
             }})
        payload = await res.json();
        console.log("Payload of Add reviews Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "AddReview", payload}
}
