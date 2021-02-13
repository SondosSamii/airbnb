function Reviews(state = {}, action) {
    switch (action.type) {
        case "AllReviews": {
            return action.payload;
        }
        case "PlaceReview":{

            return {...state,placereviews:action.payload}
        }
        case "Reviews":{
            return {...state,allreviews:action.payload}
        }
        case "AddReview":{

        }
        default: {
            return {...state,addreview:action.payload}
        }
    }
}
export default Reviews;