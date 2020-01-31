import React from 'react';
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from '../../src/components/App.js';
import Questionnaire from '../../src/components/Questionnaire.js';
import Edit from '../../src/components/Edit.js';
import {
	VIEWS,
	FIELD_NAMES
} from '../../src/constants.js';
import { 
	reducer,
	toggleView
} from '../../src/madlibs.js'

export const mockData = {
  fields: [
    FIELD_NAMES.hometown,
    FIELD_NAMES.music,
    FIELD_NAMES.messageIf,
    FIELD_NAMES.favoriteFood,
    FIELD_NAMES.loveToDo,
    FIELD_NAMES.bar 
  ],
  answers: [ 
    "Mexico", 
    "Black Metal", 
    "You like the sound of your own voice", 
    "lemons", "be bad at everything", 
    "Jimmy's Bar"
  ]
}

const store = createStore(reducer);

function setup() {
  const props = { view: VIEWS.QUESTIONNAIRE }
  const enzymeWrapper = mount(
  	<Provider store={store} >
  		<App {...props} />
  	</ Provider>
  );
  return {
    props,
    enzymeWrapper
  };
}


describe("App Component Tests", () => {
	test('should render Questionnaire by default', () => {
	   
	    const { enzymeWrapper, props } = setup();
	    
	    expect(enzymeWrapper.find(Questionnaire).length).toBe(1)
	    expect(enzymeWrapper.find(Edit).length).toBe(0);
  	});
  	test('should render Edit after a VIEW update', async () => {

	   	store.dispatch( toggleView() );
	    const { enzymeWrapper, props } = setup();
	    
	    expect(enzymeWrapper.find(Edit).length).toBe(1)
	    expect(enzymeWrapper.find(Questionnaire).length).toBe(0);
  	});
})

