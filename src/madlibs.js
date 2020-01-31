import {
  FIELD_NAMES,
  VIEWS
} from "./constants";
import {
  getRandomTemplateIndex,
  getTextTemplates
} from './helpers.js';


// Action types
// ----------------------------------------------------------------------------

export const SUBMIT_FIELD = "MADLIBS.SUBMIT_FIELD";
export const INCREMENT_COUNTER = "MADLIBS.INCREMENT_COUNTER";
export const TOGGLE_VIEW = "MADLIBS.TOGGLE_VIEW";
export const CLEAR_ESSAY = "MADLIBS.CLEAR_ESSAY";


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
  view: VIEWS.QUESTIONNAIRE,
  counter: 1,
};


// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_FIELD: {
      var updatedFieldAnswers = Object.assign( state.fieldAnswers,
          { [action.payload.fieldName] : {
              userInput: action.payload.answer,
              templateIndex: getRandomTemplateIndex(action.payload.fieldName)
            }
          }
      );
      var newEssayText = state.fieldOrder
        .filter( field => updatedFieldAnswers.hasOwnProperty(field))
        .map( field => {
          var { userInput, templateIndex } = updatedFieldAnswers[field]; 
          return getTextTemplates(field)[templateIndex].replace("$answer", "<b>" + userInput + "</b>") 
        }).join(" ");

      return { ...state, 
        fieldAnswers: updatedFieldAnswers,
        essayText: newEssayText
      }
    }

    case INCREMENT_COUNTER: {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }

    case TOGGLE_VIEW: {
      return {
        ...state, 
        view: (
          state.view === VIEWS.QUESTIONNAIRE ?
          VIEWS.EDIT :
          VIEWS.QUESTIONNAIRE
        )
      }
    }

    case CLEAR_ESSAY: {
      return {
        ...state,
        essayText: "",
        fieldAnswers: {}
      }
    }

    default:
      return state;
  }
}


// Action creators
// ----------------------------------------------------------------------------

export function submitField(id, answer) {
  return { 
    type: SUBMIT_FIELD, 
    payload: { 
      fieldName: id,
      answer 
    } 
  };
}

export function increment() {
  return { type: INCREMENT_COUNTER };
}

export function toggleView(){
  return { type: TOGGLE_VIEW };
}

export function clearEssay(){
  return { type: CLEAR_ESSAY }
}
