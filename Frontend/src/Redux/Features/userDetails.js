import axios from "axios";

const initialState = {
  value: {
    currentPage: 0,
    currentActiveIndex: 100000,
    python: [],
    java: [],
    asp_net: [],
    ejs: [],
    vue: [],
    typescript: [],
    javascript: [],
  },
};
const HANDLE_UPDATE_REC_NEXT_QUESTION = "HANDLE_UPDATE_REC_NEXT_QUESTION";
const HANDLE_UPDATE_REC_PREV_QUESTION = "HANDLE_UPDATE_REC_PREV_QUESTION";
const HANDLE_SUBMIT_CLICK = "HANDLE_SUBMIT_CLICK";
const HANDLE_EXPAND_CLICK = "HANDLE_EXPAND_CLICK";
const HANDLE_ACTIVE_INDEX = "HANDLE_ACTIVE_INDEX";
const HANDLE_FETCH_DATA = "HANDLE_FETCH_DATA";
const HANDLE_UPDATE_USER_ANSWER = "HANDLE_UPDATE_USER_ANSWER";

export const handleUpdateRecNextQuestion = (question) => ({
  type: HANDLE_UPDATE_REC_NEXT_QUESTION,
  payload: { question },
});
export const handleUserUpdateAnswer = (question, user_id, role) => ({
  type: HANDLE_UPDATE_USER_ANSWER,
  payload: { question, user_id, role },
});

export const handleFetchData = (role, data) => ({
  type: HANDLE_FETCH_DATA,
  payload: { role, data },
});

export const handleUpdateRecPrevQuestion = (question) => ({
  type: HANDLE_UPDATE_REC_PREV_QUESTION,
  payload: { question },
});

export const handleSubmitClick = (user) => ({
  type: HANDLE_SUBMIT_CLICK,
  payload: { user },
});
export const handleExpandClick = (role, index, expand) => ({
  type: HANDLE_EXPAND_CLICK,
  payload: { role, index, expand },
});
export const handleActiveIndex = (index) => ({
  type: HANDLE_ACTIVE_INDEX,
  payload: { index },
});

const userDetailsReducer = (state = initialState, action) => {
  let question_number = null;
  let currentIndex = 0;
  switch (action.type) {
    case HANDLE_ACTIVE_INDEX:
      if (state.value.currentActiveIndex == action.payload.index) {
        currentIndex = 10000000000;
      } else {
        currentIndex = action.payload.index;
      }
      return {
        ...state,
        value: { ...state.value, currentActiveIndex: currentIndex },
      };
    case HANDLE_FETCH_DATA:
      console.log(action.payload);
      return {
        ...state,
        value: {
          ...state.value,
          [action.payload.role]: action.payload.data,
        },
      };
    case HANDLE_EXPAND_CLICK:
      console.log(action.payload);
      const users = state.value[action.payload.role];
      const updatedValues = users.map((user, index) => {
        if (index == action.payload.index) {
          return { ...user, expand: !action.payload.expand };
        } else {
          return { ...user };
        }
      });

      return {
        ...state,
        value: { ...state.value, [action.payload.role]: updatedValues },
      };
    case HANDLE_SUBMIT_CLICK:
      return state;
    case HANDLE_UPDATE_REC_NEXT_QUESTION:
      console.log(action.payload);
      if (action.payload.question >= 0 && action.payload.question < 2) {
        question_number = action.payload.question + 1;
        console.log(question_number, "again");
      } else {
        question_number = action.payload.question;
      }

      return {
        ...state,
        value: {
          ...state.value,

          currentPage: question_number,
        },
      };

    case HANDLE_UPDATE_REC_PREV_QUESTION:
      // let question_number = null;
      if (action.payload.question > 0 && action.payload.question <= 2) {
        question_number = action.payload.question - 1;
      } else {
        question_number = action.payload.question;
      }

      return {
        ...state,
        value: {
          ...state.value,

          currentPage: question_number,
        },
      };
    case HANDLE_UPDATE_USER_ANSWER:
      return {
        ...state,
        value: {
          ...state.value,
          role,
        },
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
