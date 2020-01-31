import { FIELD_NAMES, VIEWS } from '../src/constants.js';
import {
	SUBMIT_FIELD,
	TOGGLE_VIEW,
	CLEAR_ESSAY,
	submitField,
	toggleView,
	clearEssay,
	reducer
} from '../src/madlibs.js';
import React from 'react';

describe("React | Redux Mad Lib Tests", () => {
describe("Action Creator Tests", () => {

	test("should create action to toggle view", () => {
		const expectedAction = { type: TOGGLE_VIEW }
		expect( toggleView() ).toEqual(expectedAction);
	});

	test("should create action to submit field", () => {
		const fieldName = FIELD_NAMES.hometown;
		const answer = "Jersey"
		const expectedAction = { 
			type: SUBMIT_FIELD,
			payload: { fieldName, answer }
		}
		expect( submitField(fieldName, answer) ).toEqual(expectedAction);
	});

	test("should create action to clear essay", () => {
		const expectedAction = { type: CLEAR_ESSAY }
		expect( clearEssay() ).toEqual(expectedAction);
	});
});

describe("Reducer Tests", () => {

	test("should return inital state", () => {
		const state = reducer(undefined, {});

		expect(state).toHaveProperty('fieldOrder')
		expect(state.fieldOrder).toEqual([
				FIELD_NAMES.hometown,
				FIELD_NAMES.favoriteFood,
				FIELD_NAMES.loveToDo,
				FIELD_NAMES.music,
				FIELD_NAMES.messageIf,
				FIELD_NAMES.bar,
			])
		expect(state).toHaveProperty('fieldAnswers')
		expect(state.fieldAnswers).toEqual({});
		expect(state).toHaveProperty('essayText')
		expect(state.essayText).toEqual("")
		expect(state).toHaveProperty('view')
		expect(state.view).toEqual(VIEWS.QUESTIONNAIRE);
		expect(state).toHaveProperty('counter')
		expect(state.counter).toEqual(1);
	});

	test("should toggle view", () => {
		const state = reducer(undefined, toggleView())

		expect(state.view).toEqual(VIEWS.EDIT);
	});

	test("should submit field", () => {
		const fieldName = FIELD_NAMES.hometown;
		const answer = "Jersey"

		const state = reducer(undefined, submitField(fieldName, answer));

		expect(state.fieldAnswers).toHaveProperty(fieldName);
		expect(state.fieldAnswers[fieldName]).toHaveProperty("userInput");
		expect(state.fieldAnswers[fieldName]).toHaveProperty("templateIndex");
		expect(state.fieldAnswers[fieldName].userInput).toEqual(answer);
		expect(state.essayText).toContain(answer);
	});

	test("should submit field multi", () => {
		const first = { fieldName: FIELD_NAMES.favoriteFood, answer: "Lemon Square Treats" }
		const second = { fieldName: FIELD_NAMES.hometown, answer: "Jersey" }
		const third = { fieldName: FIELD_NAMES.music, answer: "Rolling Stones" }
	
		const firstState = reducer(undefined, submitField(first.fieldName, first.answer));
		const secondState = reducer(firstState, submitField(second.fieldName, second.answer));
		const finalState = reducer(secondState, submitField(third.fieldName, third.answer));

		expect(finalState.fieldAnswers[second.fieldName]).toHaveProperty("templateIndex");
		expect(finalState.fieldAnswers[second.fieldName].userInput).toEqual(second.answer);
		expect(finalState.essayText).toContain(second.answer);
		
		expect(finalState.fieldAnswers[first.fieldName]).toHaveProperty("templateIndex");
		expect(finalState.fieldAnswers[first.fieldName].userInput).toEqual(first.answer);
		expect(finalState.essayText).toContain(first.answer);

		expect(finalState.fieldAnswers[third.fieldName]).toHaveProperty("templateIndex");
		expect(finalState.fieldAnswers[third.fieldName].userInput).toEqual(third.answer);
		expect(finalState.essayText).toContain(third.answer);
	});

	test("should clear essay", () => {
		const fieldName = FIELD_NAMES.hometown;
		const answer = "Jersey"

		const initState = reducer(undefined, submitField(fieldName, answer));
		const postState = reducer(undefined, clearEssay() );

		expect(postState.essayText).toEqual("");
		expect(postState.fieldAnswers).toEqual({});
	});
});

});
