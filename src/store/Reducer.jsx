import * as actionTypes from "./Actions";

const initialState = {
  userName: '',
  selectedQuestionData:{},
  scheduledRequestData:{}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SETUSERNAME:
      return {
        ...state,
        userName: action.value
      };
    case actionTypes.SELECTEDQUESTIONDATA:
      return {
        ...state,
        selectedQuestionData: action.value
      }
    case actionTypes.SCHEDULEDREQUESTDATA:
       return{
        ...state,
        scheduledRequestData :action.value
      }
  }
  return state;
};

export default reducer;
