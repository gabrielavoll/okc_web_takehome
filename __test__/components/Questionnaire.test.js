import React from 'react';
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import Questionnaire from '../../src/components/Questionnaire.js';
import Question from '../../src/components/Question.js';
import Button from '../../src/components/Button.js';
import { createStore } from "redux";
import { mockData } from './App.test.js';
import { 
  FIELDS,
  VIEWS
} from '../../src/constants.js';
import {
  reducer,
  submitField
} from '../../src/madlibs.js'

const store = createStore(reducer);

function setup() {
  const props = {};
  const enzymeWrapper = mount(
  	<Provider store={store} >
  		<Questionnaire {...props} />
  	</Provider>
  );
  return {
    props,
    enzymeWrapper
  };
}


describe("Questionnaire Component Tests", () => {
	test('should render with all default heading and questions, no user data', () => {
	   
	    const { enzymeWrapper, props } = setup();
	    
	    expect(enzymeWrapper.find('h3').length).toBe(2);
      expect(enzymeWrapper.find('h3').get(0).props.children).toEqual("About Me")
      expect(enzymeWrapper.find('h3').get(1).props.children).toEqual("Your essay text")

      const questions_keys = store.getState().fieldOrder;
      expect(enzymeWrapper.find(Question).length).toBe(questions_keys.length);
      for(var i = 0; i < questions_keys.length; i++)
        expect( enzymeWrapper.find('p').get(i).props.children).toEqual(FIELDS[questions_keys[i]]);
      
      expect(enzymeWrapper.find(Button).length).toBe(0);
  	});

  	test('should render Questionnaire with all default heading and questions, with user data', () => {
      store.dispatch( submitField( mockData.fields[0], mockData.answers[0]) )
      store.dispatch( submitField( mockData.fields[1], mockData.answers[1]) )
      store.dispatch( submitField( mockData.fields[2], mockData.answers[2]) )
      store.dispatch( submitField( mockData.fields[3], mockData.answers[3]) )
      store.dispatch( submitField( mockData.fields[4], mockData.answers[4]) )
      store.dispatch( submitField( mockData.fields[5], mockData.answers[5]) )

      const { enzymeWrapper, props } = setup();
      const finalState = store.getState();

      expect(enzymeWrapper.find(Button).length).toBe(1);
      expect(enzymeWrapper.find('h3').length).toBe(2);
      expect(enzymeWrapper.find('h3').get(0).props.children).toEqual("About Me")
      expect(enzymeWrapper.find('h3').get(1).props.children).toEqual("Your essay text")

      const questions = store.getState().fieldOrder
      expect(enzymeWrapper.find(Question).length).toBe(questions.length);

      for( var i = 0; i < questions.length; i++){
        expect( enzymeWrapper.find('p').get(i).props.children).toEqual(FIELDS[questions[i]]);
        expect( finalState.fieldAnswers[mockData.fields[i]].userInput ).toEqual( mockData.answers[i] );
      }

    });

    test('should simulate change, blur and click events which would lead us to Edit view', () => {
      const { enzymeWrapper, props } = setup();

      for(var i = 0; i < mockData.fields.length; i++){
        var input = enzymeWrapper.find('input[name="' + mockData.fields[i] +'"]').at(0);

        input.simulate('change', { target: { value: mockData.answers[i] } });
        input.simulate('blur', { target: {} });
      }

      const fullStore = store.getState();
      // test if events executed as expected on inputs and triggering expected store actions
      for(var i = 0; i < enzymeWrapper.find('input').length; i++)
        expect( enzymeWrapper.find('input').at(i).prop('value') )
          .toEqual(fullStore.fieldAnswers[ enzymeWrapper.find('input').at(i).prop('name') ].userInput );

      for( var i = 0; i < mockData.fields.length; i++){
        expect(fullStore.fieldAnswers[mockData.fields[i]].userInput).toEqual(mockData.answers[i]);
        expect(fullStore.fieldAnswers[mockData.fields[i]]).toHaveProperty("templateIndex");
      }
      
      const essay = enzymeWrapper.find('.essay-preview').at(0).text();
      for( var i = 0; i < mockData.answers.length; i++)
        expect(essay).toMatch( new RegExp( mockData.answers[i] ));

      enzymeWrapper.find(Button).at(0).find('button').simulate('click');
      
      const finalStore = store.getState();
      expect(finalStore.view).toEqual(VIEWS.EDIT);
    });
})

