import axios from "axios";

const GET_USER_GROUP = "GET_USER_GROUP";
const GET_USER_GROUP_FULFILLED = "GET_USER_GROUP_FULFILLED";
const RESET_STATE = "RESET_STATE";
const SET_FIELD = "SET_FIELD";

const initialState = {
  userGroup : [{groupName : ""}],
  queryGroup : true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_STATE:
      return {
        ...initialState
      }
    case SET_FIELD:
      return{
        ...state,
        [action.key] : action.value
      }
    case GET_USER_GROUP_FULFILLED:
    if(action.payload.valid)
      return {
        ...state,
        queryGroup : false,
        userGroup : action.payload.groupList

      };
    else{
      return{
        ...state
      }
    }
    default:
      return state;
  }
};


export const resetState = () => ({
  type : RESET_STATE
})


export const getUserGroup = (username) => ({
  type: GET_USER_GROUP,
  payload: axios
  .post("http://localhost:8000/getUserGroup", {
    username: username,
  })
  .then(function(response) {
    console.log(response.data);
    return response.data;
  })
});

export const setField = (key,value) => ({
  type : SET_FIELD,
  key : key,
  value : value
})
