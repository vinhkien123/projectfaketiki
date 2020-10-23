import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios"
export default class Facebook extends Component {

  responseFacebook = response => {
    console.log(response);
    const headers = {
      "Content-Type": "application/json"
    }

    axios.post("https://103.130.214.106:3005/api/users/login/facebook",
      {
        access_token: response.accessToken,
      }, headers)
      .then(result => {
        console.log(result);
      })
  };

  render() {
    let fbContent;

    fbContent = (
      <div
        style={{
          width: "100%",
          background: "#f4f4f4",
          padding: "20px"
        }}
      >
      </div>
    );

    fbContent = (
      <FacebookLogin
        appId="1074493309677220"
        autoLoad={false}
        fields="name,email,picture,birthday"
        scope="public_profile, email"
        callback={this.responseFacebook}
        textButton="&nbsp;&nbsp;Đăng nhập với Facebook"
      />
    );

    return <div className="Facebook_login">{fbContent}</div>;
  }
}