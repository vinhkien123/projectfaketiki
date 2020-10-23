import React, { Component } from 'react';
import { Roll } from 'react-reveal';
import { createAction } from '../../../Redux/Action';
import { DANHSACHNEWPHANTRANG, DANHSACHSANPHAMPHANTRANG } from '../../../Redux/Action/type';
import { ProductsService } from '../../../Services';
import SanPhamNew from '../../SanPhamNew';
import Slidebar from '../../Sidebar';
import { connect } from 'react-redux'
import { Spin } from 'antd';
import Pagination from '../../Pagination'
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            limit: 8,
            page: 1,
            loading: false
        }
    }
    componentDidUpdate() {
        document.body.scrollTop = 0;
        // or
        window.scrollTo(0, 0);
    }
    componentDidMount() {
        const DanhSachSalePhanTrang = (limit, page) => {
            return dispatch => {
                ProductsService.danhSachNewPhanTrang(limit, page).then(res => {
                    console.log(res.data);
                    dispatch(createAction(DANHSACHNEWPHANTRANG, res.data.data))
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
    pageOnChange = (page) => {
        this.setState({
            page,
            loading: true
        }, () => {
            const DanhSachSanPhamPhanTrang = (limit, page) => {
                return dispatch => {
                    ProductsService.danhSachNewPhanTrang(limit, page).then(res => {
                        console.log(res.data);
                        dispatch(createAction(DANHSACHNEWPHANTRANG, res.data.data))
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
        console.log("san pham new ", this.props.danhSachSanPham.counts);
        return (
            <>
                <div className="viewContent container" style={{ overflow: "hidden" }}>
                    <Roll top >
                        <h3 className="text-primary text-center my-2">Sản phẩm mới</h3>
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
                                    <SanPhamNew danhSachSanPhamNew={this.props.danhSachSanPham} />
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
}

const mapStateToProps = state => ({
    danhSachSanPham: state.productReducers.danhSachNewPhanTrang,
})
export default connect(mapStateToProps)(index);