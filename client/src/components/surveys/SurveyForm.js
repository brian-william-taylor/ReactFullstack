import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field}  from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields';

class SurveyForm extends Component{

  renderFields(){
    return _.map(formFields, field => {
      return   <Field key={field.name} label={field.label} type="text" name={ field.name } component={SurveyField} />
    });
  }


  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          <div className="form-group">
            {this.renderFields()}

            <div className="row justify-content-between">
              <div className=''>
                <Link to="/surveys" className="btn btn-danger">
                  Cancel
                </Link>
              </div>

              <div className="">
                <button className="btn btn-success" type="submit">
                  Next
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}


export default reduxForm({
  validate,
  form:'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
