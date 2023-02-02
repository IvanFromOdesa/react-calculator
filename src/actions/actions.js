import axios from 'axios'

const fetchExpressionsRequest = () => {
    return {
        type: "FETCH_EXPRESSIONS_REQUEST"
    }
}

const fetchExpressionsSuccess = exprs => {
    return {
        type: "FETCH_EXPRESSIONS_SUCCESS",
        payload: exprs
    }
}

const fetchExpressionsFailure = error => {
    return {
        type: "FETCH_EXPRESSIONS_FAILURE",
        payload: error
    }
}

// Fetching using 3rd party library axios
const fetchExpressions = () => {
    return (dispatch) => {
        dispatch(fetchExpressionsRequest);
        // Allow CORS by sending a response header "Access-Control-Allow-Origin" from BE
        axios.get("http://localhost:8080/api/cities/examples", {params: {count: 5}})
             .then(response => {
                const exprs = response.data;
                dispatch(fetchExpressionsSuccess(exprs));
             })
             .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchExpressionsFailure(errorMsg));
             })
    }
}

export default {
    fetchExpressions
};