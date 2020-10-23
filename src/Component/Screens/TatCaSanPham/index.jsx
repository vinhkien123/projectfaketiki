import React, { Component } from 'react';
import Pagination from '../../Pagination'
import { connect } from 'react-redux'
import DanhSachSanPhamm from '../../DanhSachSanPham'
import { DanhSachSanPhamPhanTrang } from '../../../Redux/Action/product';
import { Spin } from 'antd';
import { ProductsService } from '../../../Services';
import { DANHSACHSANPHAMPHANTRANG } from '../../../Redux/Action/type';
import { createAction } from '../../../Redux/Action';
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            limit: 10,
            loading: true,
        }
    }
    componentDidMount() {
        const DanhSachSanPhamPhanTrang = (limit, page) => {
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
        this.props.dispatch(DanhSachSanPhamPhanTrang(10, this.state.page))
        document.body.scrollTop = 0;
        // or
        window.scrollTo(0, 0);
    }
    componentDidUpdate(){
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
                    ProductsService.danhSachSanPhamPhanTrang(limit, page).then(res => {
                        console.log(res.data);
                        dispatch(createAction(DANHSACHSANPHAMPHANTRANG, res.data.data))
                        this.setState({
                            loading: false,
                            page,
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
            this.props.dispatch(DanhSachSanPhamPhanTrang(10, page))

        })
    }
    render() {
        return (
            <div className="container">
                <h1 className="text-center my-4">Danh Sách Sản Phẩm</h1>
                {this.state.loading ?
                    <div className="example">
                        <Spin />
                    </div>
                :
                <>
                    <div className="row">
                        <DanhSachSanPhamm />
                        {/* <Pagination defaultCurrent={this.state.page} onChange={this.pageOnChange} total={50} /> */}
                    </div>
                    <Pagination page={this.state.page} danhSachSanPham={this.props.danhSachSanPham}
                        limit={this.state.limit} pageOnChange={this.pageOnChange} total={Math.ceil(this.props.danhSachSanPham.count / this.state.limit)} />
                </>
                }

            </div>
        );
    }
}

const mapStateToProps = state => ({
    danhSachSanPham: state.productReducers.danhSachSanPhamPhanTrang,

})
export default connect(mapStateToProps)(index);