import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleView } from '../madlibs.js';

class Button extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    actionBeforeClick: PropTypes.func
  };


  handleClick(e){
    e.preventDefault();
    if( this.props.hasOwnProperty( "actionBeforeClick" ) )
      this.props.dispatch( this.props.actionBeforeClick() )
    this.props.dispatch( toggleView() );
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>{this.props.buttonText}</button> 
      </div>
    );
  }
}

export default connect()(Button);
