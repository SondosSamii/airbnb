function Reviews(state = null, action) {
    switch (action.type) {
        case "AllReviews": {
            return action.payload;
        }
        case "PlaceReview":{

            return action.payload;
        }
        case "AllReviews":{
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
export default Reviews;