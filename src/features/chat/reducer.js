import axios from "axios";

const SEARCH_TYPE = "SEARCH_TYPE";
const SEARCH_REQ = "SEARCH_REQ";
const SEARCH_REQ_PENDING = "SEARCH_REQ_PENDING";
const SEARCH_REQ_FULFILLED = "SEARCH_REQ_FULFILLED";

const initialState = {
  text: "",
  result: [],
  loading: false
};

let img = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TYPE:
      return {
        ...state,
        text: action.text
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

export const searchType = text => ({
  type: SEARCH_TYPE,
  text
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
