function Reviews(state = {}, action) {
    switch (action.type) {
        case "AllReviews": {
            return {...state,all_reviews:action.payload}
        }
        case "PlaceReviews": {
            return {...state,place_reviews:action.payload}
            // return action.payload
        }
        case "ReviewDetails": {
            return {...state,review_details:action.payload}
            // return action.payload
        }
        default: {
            return state;
        }
    }
}
export default Reviews;