import React from 'react';
import {hashHistory} from 'react-router';
import Loader from './loader.jsx';
import Alert from 'react-s-alert';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    var user = {
      name: this.refs.user_name.value,
      about: this.refs.user_about.value,
      email: this.refs.user_email.value,
      password: this.refs.user_password.value,
      adminAuth: this.refs.user_admin_auth.value
    };
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });
    var myInit = { method: 'POST',
               headers: myHeaders,
               body: "name="+user.name+"&about="+user.about+"&email="+user.email+"&password="+user.password+"&adminAuth="+user.adminAuth
               };
    var that = this;
    console.log("fetching signup");
    fetch('/signup',myInit)
    .then(function(response) {
      console.log("here above response.json");
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      console.log("here after that");
      if(response.error.error) {
        console.log('was error');
        Alert.error(response.error.message);
      } else {
          if (user.adminAuth) {
            console.log("admin user generated");
            Alert.success('Admin user generated');
          } else {
            console.log('Regular user generated');
            Alert.success('Regular user generated');
          }
          console.log('pushing login hash');
          hashHistory.push('login');
      }
    });
  }

  render () {
    return(
      <div className=" setup-form container">
      <div className="row">

        <div className="col-md-6">
          <h1><b>Welcome,</b></h1>
          <h3>Matterwiki is a simple wiki for teams</h3><br/>
          <h4>People use it to store documentation, notes, culture guidelines, employee onboarding content
          and everything they want to.</h4><br/>


        </div>
      <div className="col-md-6">
        <form>
          <div className="col-sm-12 form-group">
            <input type="text" className="form-control" ref="user_name" id="inputUserName" placeholder="Name" />
          </div>
          <div className="col-sm-12 form-group">
            <input type="text" className="form-control" ref="user_about" id="inputUserAbout" placeholder="About" />
          </div>
      <div className="col-sm-12 form-group">
        <input type="email" className="form-control" ref="user_email" id="inputUserEmail" placeholder="Email" />
      </div>
      <div className="col-sm-12 form-group">
        <input type="password" className="form-control" ref="user_password" id="inputUserPassword" placeholder="Password" />
      </div>
      <div className="col-sm-12 form-group">
        <input type="password" className="form-control" ref="user_admin_auth" id="inputAdminAuth" placeholder="Enter Admin Authorization Code (Optional)" />
      </div>
      <div className="col-sm-12 form-group">
        <button onClick={this.handleSignUp} className="btn btn-default btn-block btn-lg">Sign Me Up</button>
      </div>
    </form>
      </div>
        </div>

  </div>);
  }
}

export default SignUp;
