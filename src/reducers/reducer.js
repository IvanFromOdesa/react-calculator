const initialState = {
    loading: false,
    expressions: [],
    error: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "FETCH_EXPRESSIONS_REQUEST":
            return {
                ...state,
                loading: true
            }
        case "FETCH_EXPRESSIONS_SUCCESS":
            return {
                loading: false,
                expressions: action.payload,
                error: ''
            }
        case "FETCH_EXPRESSIONS_FAILURE":
            return {
                loading: false,
                expressions: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer;