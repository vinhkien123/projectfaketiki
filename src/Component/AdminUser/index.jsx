import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../asset/data/img/avatar.png'
class index extends Component {
    render() {
        return (
            <>
                <aside className="account-infor">
                    <div className="account-infor_name d-flex">
                        <img src={logo} alt="test" className="img-avatar" />
                        <div className="info">
                            Tài khoản của<strong>Account Name</strong>
                        </div>
                    </div>
                    <ul className="infor-item">
                        <li className="active-items">
                            <NavLink to="/user" className="d-flex">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                <span>Thông tin tài khoản</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/thongbao">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>
                                <span>Thông báo của tôi</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/quanlydonhang">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z" /></svg>
                                <span>Quản lý đơn hàng</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/diachi">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                                <span>Số địa chỉ</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/thongtinthanhtoan">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
                                <span>Thông tin thanh toán</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/nhanxetcuatoi">
                                <img src="image/review-2.svg" alt="test" />
                                <span>Nhận xét sản phẩm đã mua</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/sanphamdaxem">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
                                <span>Sản phẩm bạn đã xem</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/sanphamyeuthich">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                <span>Sản phẩm yêu thích</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/sanphammuasau">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                <span>Sản phẩm mua sau</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/nhanxetcuatoi">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>
                                <span>Nhận xét của tôi</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/hoidap">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 16h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 11.9 13 12.5 13 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" /></svg>
                                <span>Hỏi đáp</span>
                            </NavLink>
                        </li>
                        <li>
                            <a href="/">
                                <img src="image/tiknow.png" alt="test" />
                                <span>Thông tin MarketNow</span>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <img src="image/coupon_code.svg" alt="test" />
                                <span>Mã giảm giá</span>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <img src="image/xu.png" alt="test" />
                                <span>Quản lý Market Xu của tôi</span>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <img src="image/bookcare.svg" alt="test" />
                                <span>BookCare của tôi</span>
                            </a>
                        </li>
                    </ul>
                </aside>
            </>

        );
    }
}

export default index;