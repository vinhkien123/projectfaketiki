import React, { Component } from "react";
import axios from "axios"
import {linkAPI} from "../../Services/routeAPI";
const authResult = new URLSearchParams(window.location.search);
class ZaloCallback extends Component { 

    onClose() {
        window.close();
      }

    componentDidMount() {
        const headers = {
            "Content-Type": "application/json"
        }
        this.onClose();
        axios.post(`${linkAPI}api/users/login/zalo`,
            {
                code: authResult.get("code"),
                scope: authResult.get("scope"),
                uid: authResult.get("uid")
            },headers)
            .then(response =>{
                localStorage.setItem("login_marketplace", JSON.stringify(response.data),(e,r)=>{
                    this.onClose();
                });
                
            })
            .catch(e => this.onClose())
    }

    render() {
        return (
            <div className="Zalo_callback">
                loading...
            </div>
        );
    }
}

export default ZaloCallback;