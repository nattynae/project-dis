import axios from "axios";

const SET_FEILD = "SET_FEILD";
const SEARCH_REQ = "SEARCH_REQ";
const SEARCH_REQ_PENDING = "SEARCH_REQ_PENDING";
const SEARCH_REQ_FULFILLED = "SEARCH_REQ_FULFILLED";

const initialState = {
  loginPage: false
};

let img = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FEILD:
      return {
        [action.key]: action.value
      };
    case SEARCH_REQ:
      return {
        ...state
      };
    case SEARCH_REQ_PENDING:
      return {
        ...state,
        loading: true
      };
    case SEARCH_REQ_FULFILLED:
      return {
        ...state,
        loading: false,
        result: action.payload.map(e => e.urls.small)
      };
    default:
      return state;
  }
};

export const setFeild = (key, value) => ({
  type: SET_FEILD,
  key,
  value
});

export const searchReq = text => ({
  type: SEARCH_REQ,
  text,
  payload: axios
    .get(
      `https://api.unsplash.com/search/photos/?client_id=c668e84626863e64972bfae0525132f0443d6bb266800c758fa0d54735994446&page=1&query=${text}`
    )
    .then(function(response) {
      console.log(response);
      return response.data.results;
    })
});
