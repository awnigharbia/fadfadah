import React, {Component} from 'react';
import Auth from '../auth';
import {Redirect} from 'react-router-dom';
import '../App.css';


//logo
import logo from '../imgs/logo.webp';
import facebook from '../imgs/facebook.png';
import twitter from '../imgs/twitter.png';
import google from '../imgs/google-plus.png'

//components
import Link from './home-components/myLink';
import SocialWidget from './home-components/socialWidget';


export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      email:'',
      username: '',
      password: '',
      loggedIn:false,
      err:'',
    }
  }

  fullname = e => {
    const fullname = e.target.value;

    this.setState({
      fullname:fullname,
      err: '',
    });
  }

  email = e => {
    const email = e.target.value;

    this.setState({
      email:email,
      err: '',
    });
  }
  username = e => {
    const username = e.target.value;

    this.setState({
      username:username,
      err: '',
    });
  }
  password = e => {
    const password = e.target.value;

    this.setState({
      password:password,
      err: '',
    });
  }

  signup = e => {
    e.preventDefault();

    // const arr = ['awni','hello'];
    const { email, username, password, fullname } = this.state;
    if ( email !== '' && username !== '' && password !== '' && fullname !== '' ) {

      fetch('http://localhost:3001/register', {
            method:'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
              },
              body: `fullname=${fullname}&email=${email}&username=${username}&password=${password}`
          }).then((res) => {
            if(res.status === 200) {
              return res.json()
            } 
          }).then(json => {
            if(json.username) {
              this.setState({
                err:json.username.message
              })
            } else if (json.email) {
              this.setState({
                err:json.email.message
              })
            } else if (json.fullname) {
              this.setState({
                err:json.fullname.message
              })
            } else {
              Auth.authenticateUser(json.token);
              this.setState({
                loggedIn: true,
              });
            }
          }).catch((err) => {
            this.setState({
              err:'Server error ...'
            })
          })
          } else {
            this.setState({
              err: "Please Fill all the fields",
            });
          }
  }

  render() {
    const { email, username, password, fullname, err, loggedIn } = this.state;

    if (loggedIn) {
      return <Redirect from="/home/signup" to="/account/wall" push />
    } else {
      return (
        <div className="form-wrap">
            <Link to="/home/start">
              <img src={logo} alt="logo" />
            </Link>
        <div className="form">
              <form id="signup" className="form-normal">
                <h1>Sign up</h1>
                <p id="errS" style={{display:err ? 'block' : 'none' }}>{err}</p>
                <input type="text" placeholder="Full name" value={fullname} onChange={this.fullname} autoFocus style={{marginTop:0}} />
                <input type="text" placeholder="email" value={email} onChange={this.email} />
                <input type="text" placeholder="username"  value={username} onChange={this.username} />
                <input type="password" placeholder="passsowrd" value={password} onChange={this.password} />
                <button type="submit" onClick={this.signup}> Sign up</button>
                <p>Alredy have account? <Link to="/home/login">Login</Link></p>
              </form>
              <div className="form-social">
                <div className="content">
                  <h1>Or you can Signup with:</h1>
                  <hr /><hr />
                  <SocialWidget
                    img={facebook}
                    text="Sign up with Facebook"
                    color="#3D5B99"
                   />
                   <hr />
                   <SocialWidget
                     img={twitter}
                     text="Sign up with Twitter"
                     color="#55ACEE"
                    />
                  <hr />
                    <SocialWidget
                      img={google}
                      text="Sign up with Google"
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
