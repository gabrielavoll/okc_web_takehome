import React, { Component } from "react";
import PropTypes from "prop-types";
import { VIEWS } from '../constants.js';
import { connect } from "react-redux";
import Questionnaire from './Questionnaire.js';
import Edit from './Edit.js';
require("./App.scss");

class App extends Component {
   static propTypes = {
     view: PropTypes.string.isRequired
  };

  componentDidMount(){
    // Added in handling for ENTER key to mirror TAB default click handling
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 13 && event.target.nodeName === 'INPUT') {
        event.preventDefault();
        var form = event.target.form,
            next_index = Array.prototype.indexOf.call(form, event.target) + 1;
        var submitbutton = document.getElementsByTagName('button')[0];
        if(next_index >= form.elements.length)
          if(submitbutton) {
            submitbutton.focus();
            return;
          } else
            next_index = 0;
        form.elements[next_index].focus();
      }
    });
  }

  render() {
    switch (this.props.view) {
      case VIEWS.EDIT:
        return (<Edit />)
      case VIEWS.QUESTIONNAIRE:
      default: 
        return (<Questionnaire />)
    }
  }
}

function mapStateToProps(state) {
  return { view: state.view }
}

export default connect(mapStateToProps)(App);
