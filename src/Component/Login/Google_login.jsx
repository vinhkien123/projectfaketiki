import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

import "./scss/Google_login.scss"
export default class Google extends Component {
 
  responseGoogle = response => {
     console.log(response);
     const headers = {
        "Content-Type": "application/json"
      }
      
     axios.post("https://localhost:3005/api/users/login/google",
          {
            access_token: response.accessToken,
          },headers)
          .then(result =>{
            console.log(result);
          })
  };

  render() {

    let ggContent;
    console.log(this.props,"style");
      ggContent = (
        <GoogleLogin
          clientId={'111144471754-1hh9gh3p3pukagdhsetqt2l5enag5m9t.apps.googleusercontent.com'}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          buttonText="Đăng nhập với Google"
        />
      );

    return <div className="Google_login" style={{marginTop:"4px"}}>{ggContent}</div>;
  }
}