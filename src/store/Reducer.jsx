import * as actionTypes from "./Actions";

const initialState = {
  userName : ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SETUSERNAME:
      console.log("setusername calling");
      return {
        ...state,
        userName: action.value
      };
  }
  return state;
};

export default reducer;
