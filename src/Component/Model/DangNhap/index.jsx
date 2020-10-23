import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DangNhap } from '../../../Redux/Action/user';
import FacebookLogin from '../../Login/Facebook';
import GoogleLogin from '../../Login/Google_login';
import ZaloLogin from '../../Login/Zalo_login';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: ""
        }
    }
    onChange = (e) => {
        let input = e.target
        this.setState({
            [input.name]: input.value
        }, () => {
        })
    }

    onClick = (e) => {
        e.preventDefault();
        this.props.dispatch(DangNhap(this.state))
    }

    responseFacebook(response) {
        console.log(response)
      }
    render() {

        return (
            <form>
                <div className="form-group account__sign-form">
                    <label htmlFor="exampleInputEmail1">Email / SĐT</label>
                    <input type="text" name="Username" onChange={this.onChange} value={this.state.taiKhoan} className="form-control account-form" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập Email hoặc Số điện thoại" />
                </div>
                <div className="form-group account__sign-form">
                    <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                    <input type="password" name="Password" onChange={this.onChange} value={this.state.matKhau} className="form-control account-form" id="exampleInputPassword1" placeholder="Mật khẩu từ 6 đến 22 ký tự" />
                </div>
                <div className="form-group form-check check-form__account">
                    <p>Quên mật khẩu? Nhấn vào đây</p>
                </div>
                <button onClick={this.onClick} className="btn btn-warning mb-1 w-100">Đăng nhập</button>
                <FacebookLogin/>
                <GoogleLogin/>
                <ZaloLogin/>

            </form>
        );
    }
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps)(index);