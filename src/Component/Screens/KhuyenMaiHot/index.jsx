import Pagination from '../../Pagination'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Roll } from 'react-reveal';
import { createAction } from '../../../Redux/Action';
import { DanhSachSalePhanTrang } from '../../../Redux/Action/product';
import { DANHSACHSALEPHANTRANG, DANHSACHSANPHAMPHANTRANG } from '../../../Redux/Action/type';
import { ProductsService } from '../../../Services';
import SellTime from '../../SellTime';
import { Spin } from 'antd';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 8,
            loading: false,
        }
    }
    componentDidUpdate() {
        document.body.scrollTop = 0;
        // or
        window.scrollTo(0, 0);
    }
    pageOnChange = (page) => {
        this.setState({
            page,
            loading: true
        }, () => {
            const DanhSachSanPhamPhanTrang = (limit, page) => {
                return dispatch => {
                    ProductsService.danhSachSalePhanTrang(limit, page).then(res => {
                        console.log(res.data);
                        dispatch(createAction(DANHSACHSALEPHANTRANG, res.data.data))
                        this.setState({
                            loading: false,
                            page,
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
            this.props.dispatch(DanhSachSanPhamPhanTrang(8, this.state.page))

        })
    }
    render() {
        // const danhSachSale = this.props.danhSachSanPham.filter(item => item.StatusSale == true)
        console.log("?A>A?A>AS", this.props.danhSachSanPham.counts);
        return (
            <>
                <div className="viewContent container" style={{ overflow: "hidden" }}>
                    <Roll top >
                        <img className="ml-4" src="https://frontend.tikicdn.com/_desktop-next/static/img/giasoc.svg" alt="flash deal" />
                        <img src="https://frontend.tikicdn.com/_desktop-next/static/img/flash.gif" alt="flash deal" />
                        <img src="https://frontend.tikicdn.com/_desktop-next/static/img/homnay.svg" alt="flash deal" />
                    </Roll>
                    <div className="content col-12 col-lg-12">
                        <div className="option">
                            {/* {
                                this.props.keyWord != "" ?

                                    <h3 className="text-sreach">Kết quả tìm kiếm cho '{this.props.keyWord}': <span>{this.props.sreachKeyWord.length} sản phẩm</span></h3>
                                    : ""
                            } */}
                            <div className="button-option">

                                <ul className="sort-list">
                                    {/* <li>
                                    <a href="/">HÀNG MỚI</a>
                                </li>
                                <li>
                                    <a href="/">BÁN CHẠY</a>
                                </li>
                                <li>
                                    <a href="/">GIẢM GIÁ NHIỀU</a>
                                </li> */}
                                    <li>
                                        <a href="# " >Đang bán</a>
                                    </li>
                                    <li>
                                        <a href="# " >Sắp bán</a>
                                    </li>
                                    <li>
                                        <a href="# " >Theo dõi</a>
                                    </li>
                                    <li>
                                        <a href="# " >Cháy hàng</a>
                                    </li>
                                    {/* <li>
                                    <a href="/">CHỌN LỌC</a>
                                </li> */}
                                </ul>
                            </div>
                        </div>
                        {this.state.loading ?
                            <div className="example">
                                <Spin />
                            </div>
                            :
                            <div style={{ paddingLeft: "20px" }}>
                                <div className="row">
                                    <SellTime danhSachSanPham={this.props.danhSachSanPham} />
                                </div>
                                <Pagination page={this.state.page} danhSachSanPham={this.props.danhSachSanPham}
                                    limit={this.state.limit} pageOnChange={this.pageOnChange} total={Math.ceil(this.props.danhSachSanPham.counts / 8)} />
                            </div>
                        }

                    </div>
                </div>
            </>
        );
    }
    componentDidMount() {
        const DanhSachSalePhanTrang = (limit, page) => {
            return dispatch => {
                ProductsService.danhSachSanPhamPhanTrang(limit, page).then(res => {
                    console.log(res.data);
                    dispatch(createAction(DANHSACHSANPHAMPHANTRANG, res.data.data))
                    this.setState({
                        loading: false
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
        }
        this.props.dispatch(DanhSachSalePhanTrang(8, this.state.page))
        document.body.scrollTop = 0;
        // or
        window.scrollTo(0, 0);
    }
}
const mapStateToProps = state => ({
    danhSachSanPham: state.productReducers.danhSachSalePhanTrang,

})
export default connect(mapStateToProps)(index);