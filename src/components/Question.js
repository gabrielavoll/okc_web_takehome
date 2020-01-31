import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitField } from '../madlibs.js';

class Question extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    field: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    savedInput: PropTypes.string
  };

  constructor(props){
    super(props);
    this.state = { input: "" };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleBlur(){
    if(this.state.input && this.state.input.length > 0 && this.state.input != this.props.savedInput )
      this.props.dispatch(
        submitField(this.props.field, this.state.input)
      );
  }

  render() {
    return (
      <div className="question">
        <p>{this.props.question}</p>
        <input 
          type="text"
          name={this.props.field}
          value={this.state.input}
          onChange={this.handleChange}
          onBlur={this.handleBlur} />
      </div>
    );
  }
}

export default connect()(Question);
