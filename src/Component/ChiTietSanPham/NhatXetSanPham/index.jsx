import { Spin } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { createAction } from '../../../Redux/Action';
import Comment from './Comment'
import { CapNhatBinhLuan, ThemBinhLuan } from '../../../Redux/Action/product';
import { LAYDANHSACHBINHLUAN } from '../../../Redux/Action/type';
import { ProductsService } from '../../../Services';
import { Menu, Dropdown, Button } from 'antd';
import SubComment from './SubComment'

import './style.scss';
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Content: "",
            loading: false,
            update: false,
            dataUpdate: "",
            reply: false,
        }
    }
    hanldeOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    update = () => {
        this.setState({
            update: true
        })
    }
    capNhatBinhLuan = (data) => {
        this.setState({
            loading: true
        })
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            const CapNhatBinhLuan = (data, token) => {
                return dispatch => {
                    ProductsService.capNhatBinhLuan(data, token).then(res => {
                        dispatch(createAction(LAYDANHSACHBINHLUAN, res.data.data.comment))
                        this.setState({
                            loading: false
                        })
                    }).catch(err => {
                        console.log(err, "loi");
                    })
                }
            }
            this.props.dispatch(CapNhatBinhLuan(data, user.token))
        }
    }
    xoaBinhLuan = (idComment) => {
        this.setState({
            loading: true
        })
        const user = JSON.parse(localStorage.getItem('user'))
        // const XoaBinhLuan = (id, idComment, token) => {
        //     return dispatch => {
        //         ProductsService.xoaBinhLuan(this.props.id, idComment, user.token).then(res => {
        //             console.log(res);
        //             dispatch(createAction(LAYDANHSACHBINHLUAN, res.data.data.data))
        //         }).catch(err => {
        //             console.log(err);
        //         })
        //     }
        // }
        if (user) {
            console.log(this.props.id, idComment);
            const data = {
                IdProduct: this.props.id,
                IdComment: idComment
            }
            const ThemBinhLuan = (data, token) => {
                return dispatch => {
                    ProductsService.xoaBinhLuan(data, token).then(res => {
                        console.log(res.data, "data them");
                        dispatch(createAction(LAYDANHSACHBINHLUAN, res.data.data.comment))
                        this.setState({
                            loading: false
                        })

                    }).catch(err => {

                        console.log(err);

                    })
                }
            }
            this.props.dispatch(ThemBinhLuan(data, user.token))
            // ProductsService.xoaBinhLuan(data, user.token).then(res => {
            //     console.log(res);
            //     // this.props.dispatch(createAction(LAYDANHSACHBINHLUAN, res.data.data.data))

            // }).catch(err => {
            //     console.log(err);
            // })
        }
    }
    hanldeOnClick = () => {
        this.setState({
            loading: true
        })
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            const data = {
                Content: this.state.Content,
                IdProduct: this.props.id,
                IdUser: user.user._id
            }

            const ThemBinhLuan = (id, data, token) => {
                return dispatch => {
                    ProductsService.themBinhLuan(id, data, token).then(res => {
                        console.log(res.data, "data them");
                        dispatch(createAction(LAYDANHSACHBINHLUAN, res.data.data.comment))
                        this.setState({
                            loading: false
                        })

                    }).catch(err => {

                        console.log(err);

                    })
                }
            }
            this.props.dispatch(ThemBinhLuan(this.props.id, data, user.token))
            // ProductsService.themBinhLuan(this.props.id,data,user.token).then(res=>{
            //     console.log(res.data,"data them");
            //     this.props.dispatch(createAction(LAYDANHSACHBINHLUAN,res.data.data.comment))
            // }).catch(err =>{
            //     console.log(err);
            // })

            // ProductsService.themBinhLuan(data.IdProduct, data, user.token).then(res => {
            //     console.log(res.data.data, "data them");
            //     // dispatch(createAction(LAYDANHSACHBINHLUAN, res.data.data.comment))
            //     // this.props.binhLuan.push()
            //     const dataCmt = [...this.props.binhLuan,res.data.data]
            //     this.props.dispatch(createAction(LAYDANHSACHBINHLUAN,dataCmt))
            // }).catch(err => {
            //     console.log(err);
            // })
            this.setState({
                content : ""
            })

        }
        else {
            this.setState({
                loading: false
            })
            Swal.fire({
                position: "center",
                title: "Vui lòng đăng nhập để nhận xét",
                icon: "error",
                timer: 1200
            })
        }
    }
    // static getDerivedStateFromProps(nextProps, nextState) {
    //     // Any time props.email changes, update state.
    //     if (nextProps?.binhLuan !== this?.props.binhLuan) {
    //         return {
    //             loading: false
    //         }
    //     }
    // }
    themBinhLuan = (content) => {

    }
    Menu = (item) => {
        return (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.xoaBinhLuan(item._id)}>
                        Xóa
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.update}>
                        Chỉnh sửa
                </a>
                </Menu.Item>

            </Menu>
        )
    }
    render() {

        const user = JSON.parse(localStorage.getItem("user"))
        const elmentBinhLuan = this.props.binhLuan?.map((item, index) => {
            const dateNow = new Date() - new Date(item.NewDateAt)
            // setSeconds(seconds => seconds + 1);
            console.log("item",item);
            let ngay = Math.floor(dateNow / 1000 / 60 / 60 / 24)
            let gio = Math.floor(dateNow / 1000 / 60 / 60 - ngay * 24)
            let phut = Math.floor(dateNow / 1000 / 60 - ngay * 24 * 60 - gio * 60)
            let giay = Math.floor(dateNow / 1000 - ngay * 24 * 60 * 60 - gio * 60 * 60 - phut * 60)
            let validateGiay = 1000 * 60
            let validatePhut = validateGiay * 60
            let validateGio = validatePhut * 24
            let validateNgay = validateGio * 30
            let str;
            if (dateNow < validateGiay) {
                str = `${giay} giây trước`
            } else if (dateNow < validatePhut) {
                str = `${phut} phút trước`
            } else if (dateNow < validateGio) {
                str = `${gio} giờ trước`
            } else if (dateNow < validateNgay) {
                str = `${ngay} ngày trước`
            }
            return (
                <div className={`review d-flex ${this.state.loading ? `opacityText` : ""}`} key={index}>
                    <div className="info-user d-flex text-center">
                        <div className="avatar">
                            <p className="icon-avatar d-flex align-items-center justify-content-center">MC</p>
                            <p className="username">{item.UserName}</p>
                            <p className="text">{str}</p>
                        </div>
                    </div>
                    <div className="information">

                        <Comment item={item} IdComment={item._id} IdProduct={this.props.id} xoaBinhLuan={this.xoaBinhLuan} capNhatBinhLuan={this.capNhatBinhLuan} />
                        
                            <SubComment item={item} IdComment={item._id} Reply={item.Reply} IdProduct={this.props.id}/>
                        

                        {/* <div className="images-infor">
                            <img src={img} alt="test" />
                        </div> */}
                        {/* <div className="buttons-link d-flex align-items-center mt-2">
                            <a href="/">Trả lời</a>
                            <a href="/">Chia sẻ trên facebook</a>
                            <p>Nhận xét này hữu ích với bạn?</p>
                            <a href="# " className="btn btn--yellow-1"><i className="fa fa-thumbs-o-up" /> Cảm ơn</a>
                        </div> */}
                    </div>
                </div>
            )
        })
        return (
            <>
                <div className="bg-background" id="cmt">
                    <div className="container">
                        <div className="row">
                            <h4>KHÁCH HÀNG NHẬN XÉT</h4>
                        </div>
                        <div className="row bg-rw_dg">
                            <div className="col-12 col-md-4 col-lg-4 py-4 ">
                                <div className="star-rating text-center">
                                    <h4>Đánh giá trung bình</h4>
                                    <p className="score">4.5/5</p>
                                    <p className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star-half-o" />
                                    </p>
                                    <a href="/">(19 nhận xét)</a>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 py-4 border-middle ">
                                <div className="star-progress-bar d-flex align-items-center align-self-stretch">
                                    <p className="star-number d-flex align-items-center mb-0">
                                        5 <i className="fa fa-star" />
                                    </p>
                                    <div className="progress-bar_custom">
                                        <div className="progress-5" style={{ width: '69%' }} />
                                    </div>
                                    <p className="percent text-right mb-0">
                                        69%
                                    </p>
                                </div>
                                <div className="star-progress-bar d-flex align-items-center align-self-stretch">
                                    <p className="star-number d-flex align-items-center mb-0">
                                        4 <i className="fa fa-star" />
                                    </p>
                                    <div className="progress-bar_custom">
                                        <div className="progress-5" style={{ width: '16%' }} />
                                    </div>
                                    <p className="percent text-right mb-0">
                                        16%
                                    </p>
                                </div>
                                <div className="star-progress-bar d-flex align-items-center align-self-stretch">
                                    <p className="star-number d-flex align-items-center mb-0">
                                        3 <i className="fa fa-star" />
                                    </p>
                                    <div className="progress-bar_custom">
                                        <div className="progress-5" style={{ width: '5%' }} />
                                    </div>
                                    <p className="percent text-right mb-0">
                                        5%
                                    </p>
                                </div>
                                <div className="star-progress-bar d-flex align-items-center align-self-stretch">
                                    <p className="star-number d-flex align-items-center mb-0">
                                        2 <i className="fa fa-star" />
                                    </p>
                                    <div className="progress-bar_custom">
                                        <div className="progress-4" style={{ width: '0%' }} />
                                    </div>
                                    <p className="percent text-right mb-0">
                                        0%
                                      </p>
                                </div>
                                <div className="star-progress-bar d-flex align-items-center align-self-stretch">
                                    <p className="star-number d-flex align-items-center mb-0">
                                        1 <i className="fa fa-star" />
                                    </p>
                                    <div className="progress-bar_custom">
                                        <div className="progress-1" style={{ width: '10%' }} />
                                    </div>
                                    <p className="percent text-right mb-0">
                                        10%
                                      </p>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 py-4 d-flex align-items-center">
                                <div className="star-rating">
                                    <h4 className="title">Chia sẻ nhận xét về sản phẩm</h4>
                                    <button className="btn btn--yellow">Viết nhận xét của bạn</button>
                                </div>
                            </div>
                            <div className="col-12 filter d-flex align-items-center">
                                <p className="title text-center mb-0">
                                    Chọn xem nhận xét
                                </p>
                                <div className="opt-select">
                                    <select name="service">
                                        <option>Hữu ích</option>
                                        <option>Mới nhất</option>
                                        <option>Có hình ảnh</option>
                                    </select>
                                </div>
                                <div className="opt-select">
                                    <select name="service">
                                        <option>Tất cả khách hàng</option>
                                        <option>Khách đã mua hàng</option>
                                    </select>
                                </div>
                                <div className="opt-select">
                                    <select name="service">
                                        <option>Tất cả sao</option>
                                        <option>5 sao</option>
                                        <option>4 sao</option>
                                        <option>3 sao</option>
                                        <option>2 sao</option>
                                        <option>1 sao</option>
                                        <option>Hài lòng</option>
                                        <option>Chưa hài lòng</option>
                                    </select>
                                </div>
                            </div>
                            <div className="position">
                                <div className={`example ${this.state.loading ? `opacityLoading` : ""}`} style={{}}>
                                    <Spin />
                                </div>
                                {


                                    elmentBinhLuan

                                }

                            </div>



                        </div>
                        <div className="nhanXet">
                            <textarea name="Content" id="" cols="30" value={this.state.content} onChange={this.hanldeOnChange} style={{ width: "100%" }} className="Content" placeholder="Bình luận ..." rows="5"></textarea>
                            <a className="btn btn-primary button" href="#cmt" onClick={this.hanldeOnClick}>Nhận xét</a>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

const mapStateToProps = state => ({
    binhLuan: state.productReducers.layDanhSachBinhLuan

})
export default connect(mapStateToProps)(index);