import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments'
import Login from './Login'


class Header extends Component{
  renderContent(){
    switch(this.props.auth){
      case null:
        return;
      case false:
        return <Login />;
      default:
        return [
          <a key="1"><Payments /></a>,
          <span key="2" className="navbar-text" style={{margin: '0 10px', color: 'white'}}>
            Credits: {this.props.auth.credits}
          </span>,
          <a key="3" className="btn btn-primary" href="/api/logout">Logout</a>
        ];
    }
  }


  render(){
    return(
      <nav className="navbar  navbar-dark bg-primary justify-content-betw">
          <Link to={this.props.auth ? '/surveys' : '/'} className="navbar-brand mb-0 h1">
            Emaily
          </Link>
          <form className="form-inline">
            {this.renderContent()}
          </form>
      </nav>
    )
  }
}

function mapStateToProps({ auth }){
  return { auth };
}

export default connect(mapStateToProps) (Header);
