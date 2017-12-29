// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {

  function test(){
    if(error && touched){
          return 'form-control is-invalid';
    }
    else if(!error && touched){
      return 'form-control is-valid';
    }
    else{
      return "form-control";
    }

  }

  return (
    <div className="row" style={{ marginBottom: '20px' }}>
      <label htmlFor={label}>{label}</label>
      <input id={label} className={test()} {...input} style={{ marginBottom: '5px' }} />
      <div className="invalid-feedback" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
