import React from 'react';
import { Link, hashHistory } from 'react-router';
import Alert from 'react-s-alert';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
  }

  componentDidMount(){
    if(window.localStorage.getItem('userToken')) {
      hashHistory.push('home');
    }
  }

  handleSubmit(e){
    e.preventDefault();
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    this.login(email, password);
  }

  handleGuestLogin(e) {
    e.preventDefault();
    console.log(this);
    this.login("guest@guest.com", "guest");
  }

  login(email, password) {
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });
    var myInit = { method: 'POST',
               headers: myHeaders,
               body: "email="+email+"&password="+password
              };
    var that = this;
    fetch('/api/authenticate',myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
        window.localStorage.setItem('userToken',response.data.token);
        window.localStorage.setItem('userId',response.data.user.id);
        window.localStorage.setItem('isAdmin', Boolean(response.data.user.admin));
        window.localStorage.setItem('userEmail',response.data.user.token);
        hashHistory.push('home');
        Alert.success('You are now logged in');
      }
    });
  }

  handleSignUp(e) {
    e.preventDefault();
    hashHistory.push('signup');
  }

  render () {
    return(<div className="container login-box row">
        <div className="col-md-12 col-sm-12">
          <h3>Login</h3>
            <form>
          <div className="col-sm-12 form-group">
            <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
          </div>
          <div className="col-sm-12 form-group">
            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
          </div>
          <div className="col-sm-12 form-group">
            <button onClick={this.handleSubmit} className="btn btn-default btn-block btn-lg">Sign in</button>
          </div>
          <div className="col-sm-12 form-group">
            Or<br/>
            <br/>
            <button onClick={this.handleSignUp} className="btn btn-default btn-block btn-lg">Sign Up</button>
          </div>
          <div className="col-sm12 form-group">
            Or<br/>
            <br/>
            <button onClick={this.handleGuestLogin} className="btn btn-default btn-block btn-lg">Guest Login</button>
          </div>
        </form>
      </div>
    </div>);
  }
}

export default Login;
