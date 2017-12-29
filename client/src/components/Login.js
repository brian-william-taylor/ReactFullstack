import React from 'react';
import '../style/login.css';

const Login = () => {
  return (
    <div style={ { textAlign: 'center'} }>

    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#loginModal">
      Login
    </button>

    <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Login in to your account</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h4>Emaily</h4>
            <div className="row justify-content-center">
              <a href="/auth/facebook" className="btn loginBtn loginBtn--facebook">
                  Login with Facebook
              </a>
            </div>
          <div className="row justify-content-center">
            <a href="/auth/google" className="btn loginBtn loginBtn--google">
                Login with Google
            </a>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};



export default Login;
