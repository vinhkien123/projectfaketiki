import React, { Component } from 'react';
import Comment from '../Comment'
import { connect } from 'react-redux'
import { LayDanhSachBinhLuanCon } from '../../../../Redux/Action/product';
import { Button, Dropdown, Spin } from 'antd';
import { ProductsService } from '../../../../Services';
import { createAction } from '../../../../Redux/Action';
import { LAYDANHSACHBINHLUAN } from '../../../../Redux/Action/type';
import { Menu } from 'antd';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            Content: "",
            Reply: false,
            loading: false,

        }
    }
    hanldeOnClick = () => {
        this.setState({
            loading: true
        })
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            const data = {
                IdProduct: this.props.IdProduct,
                IdComment: this.props.IdComment,
                Content: this.state.Content
            }
            const themBinhLuanCon = (data, token) => {
                return dispatch => {
                    ProductsService.themBinhLuanCon(data, token).then(res => {
                        dispatch(createAction(LAYDANHSACHBINHLUAN, res.data.data.comment))
                        this.setState({
                            Content: "",
                            loading: false
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
            this.props.dispatch(themBinhLuanCon(data, user.token))

        }
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
        // <div className={`review d-flex ${this.state.loading ? `opacityText` : ""}`} key={index}>
        //         <div className="info-user d-flex text-center">
        //             <div className="avatar">
        //                 <p className="icon-avatar d-flex align-items-center justify-content-center">MC</p>
        //                 <p className="username">aaaaa</p>
        //                 <p className="text">asfasfaf</p>
        //             </div>
        //         </div>
        //         <div className="information">
        //                 <Comment item={this.props.item} IdComment={this.props.IdComment} IdProduct={this.props.IdProduct}/>
        //         </div>
        //     </div>
        console.log("cmt con", this.props.layDanhSachBinhLuanCon);
        console.log("id comment", this.props.IdComment);
        const user = JSON.parse(localStorage.getItem("user"))
        const elmentBinhLuan = this.props.Reply.map((item, index) => {
            const dateNow = new Date() - new Date(item.NewDateAt)
            // setSeconds(seconds => seconds + 1);
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
                <>
                   
                        <div className={`review d-flex ${this.state.loading ? `opacityText` : ""}`} >
                            <div className="info-user d-flex text-center">
                                <div className="avatar">
                                    <p className="icon-avatar d-flex align-items-center justify-content-center">MC</p>
                                    <p className="username"></p>
                                    <p className="text">{str}</p>
                                </div>
                            </div>
                            <div className="information">

                                {/* <SubComment item={item} IdComment={item._id} IdProduct={this.props.id} /> */}

                                {/* <div className="images-infor">
                            <img src={img} alt="test" />
                        </div> */}
                                {/* <div className="buttons-link d-flex align-items-center mt-2">
                            <a href="/">Trả lời</a>
                            <a href="/">Chia sẻ trên facebook</a>
                            <p>Nhận xét này hữu ích với bạn?</p>
                            <a href="# " className="btn btn--yellow-1"><i className="fa fa-thumbs-o-up" /> Cảm ơn</a>
                        </div> */}
                                <div className="title-infor d-flex" >
                                    <p className="star-infor">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </p>
                                    <span>Hài lòng</span>

                                    {user?user.user._id == this.props.item.IdUser ?
                                        <div className="" style={{
                                            display: "flex", justifyContent: "flex-end"
                                        }}>
                                            <Dropdown overlay={() => this.Menu(this.props.item)} placement="bottomRight" arrow>
                                                <Button>...</Button>
                                            </Dropdown>
                                        </div>
                                        : "":""}
                                </div>
                                <p className="pur-infor d-flex align-items-center">
                                    <span className="img-pur d-inline-block" /> Đã mua hàng
                             </p>
                                {
                                    !this.state.update ?
                                        <p className="content">
                                            {item.Content}
                                        </p> :
                                        <textarea name="Content" id="" cols="30" ref="input" value={this.state.Content}
                                            onChange={this.hanldeOnChange} style={{ width: "100%" }}
                                            className="form-control" placeholder="Bình luận ..." rows="5"></textarea>
                                }
                                <div className="" style={{
                                    display: "flex", justifyContent: "flex-end"
                                }}>

                                    {this.state.update ?
                                        <>
                                            <button className="btn btn-warning" onClick={this.upload}>Lưu</button>
                                            <button className="btn btn-outline-info ml-2" onClick={this.huy}>Hủy</button>
                                        </>
                                        : ""}
                                </div>
                            </div>
                        </div>


                </>
            )
        })

        return (

            <>
                {!this.state.reply ?
                    <a onClick={() => {
                        this.setState({
                            reply: true
                        })
                    }}>Xem câu trả lời ({this.props.Reply.length})</a> :
                    <>
                        <div className="position" id="subcoment">
                            <div className={`example ${this.state.loading ? `opacityLoading` : ""}`} style={{}}>
                                <Spin />
                            </div>
                            {elmentBinhLuan}

                        </div>
                        < div className="nhanXet">
                            <textarea name="Content" id="" cols="15" value={this.state.Content} onChange={(e) => {
                                this.setState({
                                    [e.target.name]: e.target.value
                                })
                            }} style={{ width: "100%" }} className="Content" placeholder="Bình luận ..." rows="5"></textarea>
                            <a className="btn btn-primary button" href="#subcoment" onClick={this.hanldeOnClick}>Nhận xét</a>
                        </div>
                    </>
                }

            </>
        );
    }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {

            this.props.dispatch(LayDanhSachBinhLuanCon(this.props.IdProduct, this.props.IdComment, user.token))

        }
    }
}

const mapStateToProps = state => ({
    layDanhSachBinhLuanCon: state.productReducers.danhSachBinhLuanCon
})
export default connect(mapStateToProps)(index);