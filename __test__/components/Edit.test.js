import React from 'react';
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import Edit from '../../src/components/Edit.js';
import Button from '../../src/components/Button.js';
import { createStore } from "redux";
import { mockData } from './App.test.js';
import { 
	reducer,
	toggleView,
  submitField
} from '../../src/madlibs.js'
import { VIEWS } from '../../src/constants.js';

const store = createStore(reducer);
// need to start in edit view
store.dispatch( toggleView() );

function setup() {
  const props = {};
  const enzymeWrapper = mount(
  	<Provider store={store} >
  		<Edit {...props} />
  	</Provider>
  );
  return {
    props,
    enzymeWrapper
  };
}

describe("Edit Component Tests", () => {
	test('should render with all default fields, empty of data', () => {
	   
	    const { enzymeWrapper, props } = setup();
	    
	    expect(enzymeWrapper.find('h3').length).toBe(1);
      expect(enzymeWrapper.find('h3').get(0).props.children).toEqual("Your essay text")
      
      expect(enzymeWrapper.find('textarea').length).toBe(1);
      expect(enzymeWrapper.find('textarea').at(0).prop('value')).toEqual("");

      expect(enzymeWrapper.find(Button).length).toBe(1);
  });
  test('should render with all default fields, full of data', () => {
      store.dispatch( submitField( mockData.fields[0], mockData.answers[0]) )
      store.dispatch( submitField( mockData.fields[1], mockData.answers[1]) )
      store.dispatch( submitField( mockData.fields[2], mockData.answers[2]) )
     
      const { enzymeWrapper, props } = setup();

      expect(enzymeWrapper.find('textarea').length).toBe(1);
      const essay = enzymeWrapper.find('textarea').at(0).prop('value')

      for( var i = 0; i < 3; i++)
        expect(essay).toMatch( new RegExp( mockData.answers[i] ));

  });

  test('should simulate click back to Questionnaire view and clear data', () => {
      store.dispatch( submitField( mockData.fields[0], mockData.answers[0]) )
      store.dispatch( submitField( mockData.fields[1], mockData.answers[1]) )
      store.dispatch( submitField( mockData.fields[2], mockData.answers[2]) )
      store.dispatch( submitField( mockData.fields[3], mockData.answers[3]) )
      store.dispatch( submitField( mockData.fields[4], mockData.answers[4]) )
      store.dispatch( submitField( mockData.fields[5], mockData.answers[5]) )
      
      const { enzymeWrapper, props } = setup();

      expect(enzymeWrapper.find('textarea').length).toBe(1);

      const essay = enzymeWrapper.find('textarea').at(0).prop('value')
      for( var i = 0; i < mockData.answers.length; i++)
        expect(essay).toMatch( new RegExp( mockData.answers[i] ));

      enzymeWrapper.find(Button).at(0).find('button').simulate('click');
      
      const postStoreState = store.getState();
      expect(postStoreState.essayText).toEqual("")
      expect(postStoreState.fieldAnswers).toEqual({});

      expect(postStoreState.view).toEqual(VIEWS.QUESTIONNAIRE);
    });
})

