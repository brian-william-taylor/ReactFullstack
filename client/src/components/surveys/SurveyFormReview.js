import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history}) => {

  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div htmlFor={label} key={name}>
        <label>{label}</label>
        <div id={label}>
          {formValues[name]}
        </div>
      </div>
    );
  });



  return (
    <div className="container">
      <h5>Please confirm your entries</h5>
        {reviewFields}

      <div className="row justify-content-between">
        <div className=''>
          <button className="btn btn-warning" onClick={onCancel}>
            Back
          </button>
        </div>


        <div className="">
          <button
          // () => is being used to stop submitSurvey submit from automatically running on load
          onClick={() => submitSurvey(formValues, history)}
            className="btn btn-success"
          >
            Send Survey
          </button>
        </div>
      </div>
    </div>
  )
};


function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
