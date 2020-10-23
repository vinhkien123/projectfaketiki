import { Spin } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createAction } from '../../Redux/Action';
import { GiamGioHang, LayDanhSachGioHangUser, SanPhamXoa, ThemGioHang } from '../../Redux/Action/shopingcart';
import { DANHSACHGIOHANGTHEOUSER, LOADINGGIOHANG } from '../../Redux/Action/type';
import { ShopingServices } from '../../Services';
import GioHangRong from "./GioHangRong";
import './style.scss'
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Quantity: 0,
            loading: true,
        }
    }
    setLoading() {
        this.setState({
            loading: false
        })
    }
    xoaGioHang(userId, productId) {
        const data = {
            UserId: userId,
            ProductId: productId
        }
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.props.dispatch(SanPhamXoa(data, user.token))
        }

    }
    tangGiamSoLuong(SoLuong) {

        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.props.dispatch(ThemGioHang(SoLuong, user.token))
        }
    }
    tangSoLuong(item) {
        const tangSoLuong = {
            Quantity: 1,

            ProductId: item._id,
            UserId: this.props.thongTinTaiKhoan._id
        }

        this.tangGiamSoLuong(tangSoLuong)

    }
    giamSoluong(item) {
        const user = JSON.parse(localStorage.getItem('user'))

        const giamSoLuong = {
            Quantity: 1,
            ProductId: item._id,
            UserId: this.props.thongTinTaiKhoan._id
        }
        if (user) {
            // this.props.dispatch(ThemGioHang(SoLuong,user.token))

            this.props.dispatch(GiamGioHang(giamSoLuong, user.token))
        }

    }

    render() {
        console.log("gio hang ", this.props.danhSachGioHangTheoUser.ListProduct);
        const elementGioHang = this.props.danhSachGioHangTheoUser.ListProduct?.map((item, index) => {
            const Total = () => {
                // for(this.props.danhSachGioHangTheoUser.length)
            }
            return (

                <li className="cart-products__product" key={index}>
                    <div className="cart-products__inner">
                        <div className="cart-products__img">
                            <a href="# " className="">
                                <img src={item.Image} alt="test" />
                            </a>
                        </div>
                        <div className="cart-products__content">
                            <div className="cart-products__content--inner">
                                <div className="cart-products__desc">
                                    <a href="# " className="cart-products__name">
                                        {item.Name}
                                    </a>
                                    <span className="cart-products__seller">
                                        Cung cấp bởi ....
                                    </span>
                                    <p className="cart-products__actions">
                                        <span className="cart-products__del">Xóa</span>
                                        <span className="cart-products__buy-later">Để dành mua sau</span>
                                    </p>
                                </div>
                                <div className="cart-products__details">
                                    <div className="cart-products__pricess">
                                        <p className="cart-products__real-prices">
                                            {item.Price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &nbsp; ₫
                                        </p>
                                        <p className="cart-products__discount-prices">
                                            <del>2.290.000đ</del>
                                            <span> | 14%</span>
                                        </p>
                                    </div>
                                    <div className="cart-products__qty">
                                        <div className="group-input">
                                            <button onClick={() => this.giamSoluong(item, item.Quantity)} >-</button>
                                            <input type="text" name="Quantity" className="input" value={item.Quantity} id="" />
                                            <button onClick={() => this.tangSoLuong(item, item.Quantity)}>+</button>
                                        </div>
                                        <button onClick={() => this.xoaGioHang(this.props.thongTinTaiKhoan._id, item._id)} className="btn btn-danger m-4">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

            )
        })
        console.log("logio hang ", this.props.loadingGioHang);
        let render
        if (this.state.loading == true) {
            render = <div className="example">
                <Spin />
            </div>
        } else if (this.props.danhSachGioHangTheoUser.ListProduct?.length >= 1) {

            render = <div className="gioHang container my-5">
                <h2 className="title"> Giỏ hàng <span>({this.props.danhSachGioHangTheoUser?.ListProduct.length} Sản phẩm)</span></h2>
                <div className="row">
                    <div className="cart-products-inner" style={{ float: "left" }} >
                        <ul className="cart-products__products">
                            {elementGioHang}

                            {/* test */}
                        </ul>
                    </div>
                    <div className="cart-total-prices">
                        <div className="cart-total-prices__inner">
                            <div className="prices">
                                <ul className="prices__items">
                                    <li className="prices__item">
                                        <span className="prices__text">Tạm tính</span>
                                        <span className="prices__value">
                                            {this.props.danhSachGioHangTheoUser.SubPrice?.toString().replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, ",")}
                                        </span>
                                    </li>
                                </ul>
                                <p className="prices__total">
                                    <span className="prices__text">Thành tiền</span>
                                    <span className="prices__value ">
                                        {this.props.danhSachGioHangTheoUser.SubPrice?.toString().replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, ",")}đ <i>(Đã bao gồm VAT nếu có)</i>
                                    </span>
                                </p>
                                <NavLink to="/checkout/oder" className="cart__submit">Tiến hàng đặt hàng</NavLink>
                                <div className="coupon">
                                    <p className="coupon-title">
                                        Mã giảm giá / Quà tặng
                                    </p>
                                    <div className="inner">
                                        <input type="text" className="coupon-input" placeholder="Nhập ở đây...." />
                                        <button className="coupon-button" disabled>Đồng ý</button>
                                    </div>
                                    <div className="coupon-content">
                                        <p className="note">
                                            Mã giảm giá đã lưu.
                                            <a href="/">Xem tại đây</a>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else {

            render = <GioHangRong />
        }
        return (
            <>

                {render}


            </>
        );
    }
    componentDidMount() {
        document.body.scrollTop = 0;
        // or
        window.scrollTo(0, 0);
        let userObj = JSON.parse(localStorage.getItem('user'))
        if (userObj) {
            const LayDanhSachGioHangUser = (id, token,setLoading) => {
                return dispatch => {
                    console.log("API giỏ hàng");
                    ShopingServices.layDanhSachGioHangTheoUser(id, token).then(res => {
                        console.log("redux", res.data.data.ListProduct);
                        dispatch(createAction(DANHSACHGIOHANGTHEOUSER, res.data.data))
                        this.setState({
                            loading : false
                        })
                    }).catch(err => {
                        console.log("kthanhcong");
                        console.log("al", err);
                    })
                }
            }
            this.props.dispatch(LayDanhSachGioHangUser(userObj?.user._id, userObj?.token))
        }

    }
}

const mapStateToProps = state => ({
    danhSachSanPham: state.productReducers.danhSachSanPham,
    danhSachGioHangTheoUser: state.shoppingcartReducers.danhSachGioHangTheoUser,
    loadingGioHang: state.shoppingcartReducers.loadingGioHang,
    thongTinTaiKhoan: state.userReducers.thongTinTaiKhoan,
    login: state.userReducers.login
})
export default connect(mapStateToProps)(index);