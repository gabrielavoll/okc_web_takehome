import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Question from './Question.js';
import Button from './Button.js';
import { FIELDS } from '../constants.js';

class Questionnaire extends Component {
  static propTypes = {
    fieldOrder: PropTypes.array.isRequired,
    fieldAnswers: PropTypes.object.isRequired,
    essayText: PropTypes.string
  };

  render() {
    return (
      <div className="container">
        <div className="column left off-color-bkg">
          <div className="column-inner">

            <h3>About Me</h3>

            <form onSubmit={(e) => e.preventDefault() }>
              { this.props.fieldOrder.map( field => 
                <Question
                  key={field}
                  field={field}
                  question={FIELDS[field]} />
                ) 
              }
            </form>

          </div>
        </div>
        <div className="column right">
          <div className="column-inner">

            <h3>Your essay text</h3>

            <div className="essay-preview" dangerouslySetInnerHTML={{__html: this.props.essayText}} />
            { 
              this.props.fieldOrder.length === Object.keys(this.props.fieldAnswers).length ?
                <Button buttonText="Edit" /> :
                <div />
            }

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fieldOrder: state.fieldOrder,
    fieldAnswers: state.fieldAnswers,
    essayText: state.essayText
  };
}

export default connect(mapStateToProps)(Questionnaire);
