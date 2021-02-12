const baseURL = "http://my-json-server.typicode.com/sondossamii/airbnb/reviews";

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

export async function getPlaceReviews(token,id) {
    var payload = null;
    try {
        let url="http://localhost:8080/api/placeReviews/"+id
        const res = await fetch(url,{
        method: "GET",
        headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json",
             }})
        payload = await res.json();
        console.log("Payload of place reviews Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "PlaceReview", payload}
}
export async function AllReviews(token) {
    var payload = null;
    try {
        let url="http://localhost:8080/api/allReviews"
        const res = await fetch(url,{
        method: "GET",
        headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json",
             }})
        payload = await res.json();
        console.log("Payload of AllReviews Action: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "AllReviews", payload}
}