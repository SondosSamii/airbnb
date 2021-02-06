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