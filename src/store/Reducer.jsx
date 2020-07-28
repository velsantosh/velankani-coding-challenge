import * as actionTypes from "./Actions";

const initialState = {
  userName: '',
  selectedQuestionData:{},
  scheduledRequestData:{},
  editUserData:{},
  assignQuestionData:{},
  selectedTemplateData:{}

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
      case actionTypes.EDITUSERDATA:
       return{
        ...state,
        editUserData :action.value
      }
      case actionTypes.ASSIGNQUESTION:
       return{
        ...state,
        assignQuestionData :action.value
      }
      case actionTypes.SELECTEDTEMPLATEDATA:
        return{
         ...state,
         selectedTemplateData :action.value
       }
  }
  return state;
};

export default reducer;
