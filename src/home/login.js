import React, {Component} from 'react';
import { Redirect } from 'react-router';
import '../App.css';
import Auth from '../auth';

//logo
import logo from '../imgs/logo.webp';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import google from '../imgs/google-plus.png'

//components
import Link from './home-components/myLink';
import SocialWidget from './home-components/socialWidget';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email:'',
      password:'',
      err: '',
      loggedIn: false,
    }
  }

  email = e => {
    const email = e.target.value;

    this.setState({
      email:email,
    });
  }

  password = e => {
    const password = e.target.value;

    this.setState({
      password:password,
    });
  }

  login = e => {
    e.preventDefault();
    const { email, password } = this.state;

    if ( email !== '' && password !== '' ) {
      fetch('http://localhost:3001/login', {
            method:'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
              },
              body: `email=${email}&password=${password}`
          }).then((res) => {
            if (res.status === 200) {
              return res.json();
            } 
          }).then(json => {
            if (json) {
              Auth.authenticateUser(json.token);
              this.setState({
                loggedIn: true,
              });
          }
          }).catch((err) => {
            if (err) {
              this.setState({
                err:'Server error ..'
              })
            }
          }) 
          } else {
            this.setState({
              err: "Please enter your username or password",
            });
          }
}


  render() {
    const { email, password, loggedIn, err } = this.state;

    if (loggedIn) {
      return <Redirect push from="/home/login" to="/account/wall"  />;
    } else {
      return (
        <div className="form-wrap">
          <Link to="/home/start">
            <img src={logo} alt="logo" />
          </Link>
          <div className="form">
                <form method="post" id="login" className="form-normal">
                  <h1>Login</h1>
                  <p id="err" style={{display:err ? 'block' : 'none' }}>{err}</p>
                  <input type="text" placeholder="email or username" value={email} onChange={this.email} autoFocus />
                  <input type="password" placeholder="passsowrd" value={password} onChange={this.password} />
                  <button type="submit" onClick={this.login}>Login</button>
                  <Link to="/home/resetpassword" id="resetpassword">Forgot passowrd?</Link>
                  <p>didn't have account yet? <Link to="/home/signup">Sign up</Link></p>
                </form>
              <div className="form-social">
                <div className="content">
                  <h1>Or you can login with:</h1>
                  <hr /><hr />
                  <SocialWidget
                    img={facebook}
                    text="Login with Facebook"
                    color="#3D5B99"
                  />
                  <hr />
                  <SocialWidget
                    img={twitter}
                    text="Login with Twitter"
                    color="#55ACEE"
                    />
                  <hr />
                    <SocialWidget
                      img={google}
                      text="Login with Google"
                      color="#DC4E41"
                    />
                  </div>
                </div>
              </div>
            </div>
      )
    }
  }
}
