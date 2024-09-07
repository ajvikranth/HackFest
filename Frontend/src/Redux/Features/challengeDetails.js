const initialState = {
  value: {},
};

const HANDLE_DATA_FETCH = "HANDLE_DATA_FETCH";
const HANDLE_UPDATE_USER = "HANDLE_UPDATE_USER";
const HANDLE_UPDATE_ACCEPTED_TIME = "HANDLE_UPDATE_ACCEPTED_TIME";
const HANDLE_UPDATE_IS_COMPLETED = "HANDLE_UPDATE_IS_COMPLETED";

export const handleChallengeDataFetch = (data) => ({
  type: HANDLE_DATA_FETCH,
  payload: { data },
});

export const handleUpdateUserAnswer = (answer, questionNumber) => ({
  type: HANDLE_UPDATE_USER,
  payload: { answer, questionNumber },
});

export const handleUpdateUserAcceptedTime = (time) => ({
  type: HANDLE_UPDATE_ACCEPTED_TIME,
  payload: { time },
});

export const handleUpdateUserCompleted = () => ({
  type: HANDLE_UPDATE_IS_COMPLETED,
  payload: {},
});

const challengeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_DATA_FETCH:
      return { ...state, value: action.payload.data };
    case HANDLE_UPDATE_USER:
      const updatedAnswers = [...state.value.answers];
      updatedAnswers[action.payload.questionNumber] = action.payload.answer;
      return {
        ...state,
        value: {
          ...state.value,
          answers: updatedAnswers,
        },
      };
    case HANDLE_UPDATE_ACCEPTED_TIME:
      return {
        ...state,
        value: {
          ...state.value,
          acceptedTime: action.payload.time,
          isaccepted: true,
        },
      };
    case HANDLE_UPDATE_IS_COMPLETED:
      console.log("here in challengeDetails");
      return {
        ...state,
        value: { ...state.value, iscompleted: true },
      };
    default:
      return state;
  }
};
export default challengeReducer;
