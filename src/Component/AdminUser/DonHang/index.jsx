import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DonHang } from '../../../Redux/Action/shopingcart';
import { Modal, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import { ProductsService } from '../../../Services';
import Swal from 'sweetalert2';
class index extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    rating = (Star, IdProduct) => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            const data = {
                IdProduct,
                Star
            }
            ProductsService.themDanhGia(data,user.token).then(res =>{
                console.log(res);
            }).catch(err=>{
                Swal.fire({
                    title : err.response.data.message , 
                    icon : "error",
                    position : "center"
                })
            })
        }
    }
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.props.dispatch(DonHang(this.props.match.params._id, user.token))

        }
    }
    render() {
        // const elementDonHang = this.props.quanLyDonHang.map((item, index) => {
        //     return (
        //         <tr key={index}>
        //             {/* <input type="radio" onChange={this.onChange} name="radio"/> */}
        //             <td>{index + 1}</td>
        //             <td>{item.Name?.length > 44 ? item.Name?.slice(0, 44) + "...." : item.Name}</td>
        //             <td><img src={item.Image} alt="test" /> </td>
        //             <td>{item.Price} Đồng</td>
        //             <td>
        //                 <button className="btn btn-danger" onClick={() => this.xoaSanPham(item._id)}>Xóa</button>
        //                 <NavLink to={`/admin/suasanpham/${item._id}`} className="btn btn-warning ml-2">Sửa</NavLink>
        //             </td>
        //         </tr>
        //     )
        // })


        const elmDonHang = this.props.donHang.Products?.map((item, index) => {
            let tongTien = item.Price * item.Quantity

            return (
                //  Address Name
                <>

                    <tr key={index}>
                        {/* <input type="radio" onChange={this.onChange} name="radio"/> */}
                        <td>{index + 1}</td>
                        <td>{item.Name?.length > 44 ? item.Name?.slice(0, 44) + "...." : item.Name}</td>
                        <td>{item.Price.toString().replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, ",")}</td>
                        <td>{item.Quantity}</td>
                        <td>{tongTien.toString().replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, ",")}</td>
                        <td><Button type="primary" onClick={this.showModal}>
                            Đánh giá
                     </Button></td>

                    </tr>
                    <Modal
                        title="Đánh giá"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <button className="btnone " onClick={() => this.rating(5, item._id)}>
                            <p className="textIcon">5 <FontAwesomeIcon icon={faStar} /> </p>
                        </button>
                        <button className="btnone"  onClick={() => this.rating(4, item._id)} >
                            <p className="textIcon">4 <FontAwesomeIcon icon={faStar} /> </p>
                        </button>
                        <button className="btnone" onClick={() => this.rating(3, item._id)}>
                            <p className="textIcon">3 <FontAwesomeIcon icon={faStar} /> </p>
                        </button>
                        <button className="btnone" onClick={() => this.rating(2, item._id)}>
                            <p className="textIcon">2 <FontAwesomeIcon icon={faStar} /> </p>
                        </button>
                        <button className="btnone" onClick={() => this.rating(1, item._id)}>
                            <p className="textIcon">1 <FontAwesomeIcon icon={faStar} /> </p>
                        </button>
                    </Modal>
                </>
            )
        })
        return (
            <>
                <table className="table">

                    <th>
                        <tr>
                            <td>STT</td>
                            <td>Tên sản phẩm</td>
                            <td>Giá</td>
                            <td>Số lượng</td>
                            <td>Tổng tiền</td>
                            <td>Thao tác</td>
                        </tr>
                        {elmDonHang}
                    </th>
                    <tbody>

                    </tbody>
                    {/* <div className="address-text_list">
                    <p className="name">{this.props.quanLyDonHang.Name}</p>
                    <p className="address">Địa chỉ: {this.props.quanLyDonHang.Address}</p>
                    <p className="address">Việt Nam</p>
                    <p className="phone">Điện thoại: {this.props.quanLyDonHang.Phone}</p>

                    <span className="defaut-title">Mặc định</span>
                </div> */}
                </table>
            </>
        );
    }
}

const mapStateToProps = state => ({
    donHang: state.shoppingcartReducers.donHang

})
export default connect(mapStateToProps)(index);