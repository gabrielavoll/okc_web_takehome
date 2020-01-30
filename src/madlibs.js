import {
  FIELD_NAMES,
} from "./constants";


// Action types
// ----------------------------------------------------------------------------

export const SUBMIT_FIELD = "MADLIBS.SUBMIT_FIELD";
export const INCREMENT_COUNTER = "MADLIBS.INCREMENT_COUNTER";


// Initial state
// ----------------------------------------------------------------------------

export const INITIAL_STATE = {
  fieldOrder: [
    FIELD_NAMES.hometown,
    FIELD_NAMES.favoriteFood,
    FIELD_NAMES.loveToDo,
    FIELD_NAMES.music,
    FIELD_NAMES.messageIf,
    FIELD_NAMES.bar,
  ],

  fieldAnswers: {},
  essayText: "",

  counter: 1,
};


// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_FIELD: {
      return state;
    }

    case INCREMENT_COUNTER: {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }

    default:
      return state;
  }
}


// Action creators
// ----------------------------------------------------------------------------

export function submitField({ id, answer }) {
  return { type: SUBMIT_FIELD, payload: { fieldName: id, answer } };
}

export function increment() {
  return { type: INCREMENT_COUNTER };
}
