import React, { Component } from "react";
// import axios from "axios"
export default class ZALO extends Component {
 
    zlShare = () => {
    var win;
    var checkConnect;
    let url_continue = encodeURIComponent("https://oauth.zaloapp.com/v3/auth?app_id=493217402839592414&redirect_uri=https://ngodongdac.tk/login/zalo");
    
    win = window.open(`https://id.zalo.me/account/login?continue=${url_continue}`,"data",'height=650,width=650,left=250')    
        checkConnect = setInterval(function() {
          if (!win || !win.closed) return
          
          clearInterval(checkConnect);
          window.location.reload()
        }, 100);
    }

  render() {
    const zalo_style ={
      width : "100%",
      border : "none",
      marginBottom: "5px",
      borderRadius: "3px",
      fontSize: "14px",
      lineHeight: "34px",
      outline: "none",
      textShadow: "rgb(171, 171, 171) 0px 0px 1px",
      background: "rgb(15, 142, 221)",
      color: "white"
    }
    return <div className="Zalo_login">
        <button className="btn_zalo_login" style={zalo_style} onClick={this.zlShare}>Đăng nhập zalo </button>
    </div>;
  }
}