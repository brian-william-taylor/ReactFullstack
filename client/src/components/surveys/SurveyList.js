import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchSurveys } from '../../actions';


class SurveyList extends Component{
  componentDidMount(){
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card" key={survey._id}>
          <div className="card-body">
            <h5 className="card-title">{survey.title}</h5>
            <p className="card-text">
              {survey.body}
            </p>
            <p className="blockquote-footer">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-footer">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

    render(){
      return (
        <div>
          {this.renderSurveys()}
        </div>
      );
    }
}


function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
