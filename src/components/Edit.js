import React, { Component } from "react";
import Button from './Button.js';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearEssay } from '../madlibs.js';

class Edit extends Component {
  static propTypes = {
    essayText: PropTypes.string,
  };

  constructor(props){
    super(props);
    this.state = { essay: this.props.essayText.replace(/<b>|<\/b>/g, '') } ;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({ essay: e.target.value });
  }

  render() {
    return (
      <div className="container off-color-bkg center">
        <div className="column">
          <div className="column-inner essay">

            <h3>Your essay text</h3>

            <textarea
              value={this.state.essay}
              onChange={this.handleChange} />
            <Button
              buttonText="Start Over"
              actionBeforeClick={clearEssay} />
              
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { essayText: state.essayText };
}

export default connect(mapStateToProps)(Edit);
