import { Menu } from 'antd';
import React, { Component } from 'react';
import { Fade } from 'react-awesome-reveal';
import { connect } from 'react-redux';
import { Bounce, LightSpeed } from 'react-reveal';
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import Banner from '../../../asset/data/img/banner1.jpg';
import Banner1 from '../../../asset/data/img/banner2.jpg';
import Banner2 from '../../../asset/data/img/banner3.jpg';
import view1 from '../../../asset/data/img/banner1.png';
import view2 from '../../../asset/data/img/banner2.png';
import view3 from '../../../asset/data/img/banner3.png';
import view4 from '../../../asset/data/img/banner4.png';
import { DanhSachNewPhanTrang, DanhSachSalePhanTrang, DanhSachSanPhamPhanTrang, SreachSanPham } from '../../../Redux/Action/product';
import DanhSachSanPhamm from '../../DanhSachSanPham';
import DanhMucCon from '../../Header/DanhMucCon';
import SanPhamNew from '../../SanPhamNew';
import SellTime from '../../SellTime';
import { Spin } from 'antd';
import './style.scss'
import { ProductsService } from '../../../Services';
import { createAction } from '../../../Redux/Action';
import { DANHSACHSANPHAMPHANTRANG } from '../../../Redux/Action/type';

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            limit: 10,
            product: 10,
            loading: false,
            scrollSeeMore: true,
            flag: false

        }
    }
    componentDidMount() {
        let scrollFlag = true;
        document.querySelector('body').addEventListener("scroll", () => {
            if (document.body.scrollTop > this.refs.button?.offsetTop - window.innerHeight && this.state.scrollSeeMore) {
                if (!this.state.flag) {
                    this.setState({ scrollSeeMore: false })
                    this.XemThem();
                }
            }
        })
        this.props.dispatch(DanhSachSanPhamPhanTrang(10, 1))
        this.props.dispatch(DanhSachSalePhanTrang(10, 1))
        this.props.dispatch(DanhSachNewPhanTrang(10, 1))
    }
    flag = () => {
        this.setState({
            flag: true
        })
    }
    onClick = (keyWord) => {
        this.props.dispatch(SreachSanPham(keyWord))
    }
    XemThem = () => {
        console.log(this.refs.button);
        this.setState({
            product: this.state.product + 10,
            loading: true
        }, () => {
            const DanhSachSanPhamPhanTrang = (limit, page) => {
                return dispatch => {
                    ProductsService.danhSachSanPhamPhanTrang(limit, page).then(res => {
                        console.log(res.data, "srool");
                        dispatch(createAction(DANHSACHSANPHAMPHANTRANG, res.data.data))
                        this.setState({
                            loading: false,
                            scrollSeeMore: true
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
            this.props.dispatch(DanhSachSanPhamPhanTrang(this.state.product, 1))

        })
    }
    pageOnChange = (page) => {
        this.setState({
            page,
        }, () => {
            this.props.dispatch(DanhSachSanPhamPhanTrang(10, page))

        })
    }

    render() {

        console.log("danh sach new", this.props.danhSachNewPhanTrang);
        function handleClick(e) {
        }
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 8,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        const setting = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 4000,
            pauseOnHover: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        const { SubMenu } = Menu;

        const danhMucSanPham = this.props.danhMucSanPham?.map((item, index) => {
            return (

                <NavLink to={`sanpham/danhmuc/${item.Title}/${item._id}`} key={index}>
                    <Menu onClick={handleClick} style={{ width: 256, height: 35 }} mode="vertical">
                        <SubMenu key="sub4"

                            con={
                                <img src={item.Icon}
                                    width={18} className="mr-1" alt="test" />
                            } title={
                                item.Title
                            }>

                            <DanhMucCon ListSubCategory={item.ListSubCategory} MenuItem={<Menu.Item></Menu.Item>} />

                        </SubMenu>
                    </Menu>
                </NavLink >
            )
        })
        const danhSachSale = this.props.danhSachSanPham.filter(item => item.StatusSale == true)
        return (

            <>
                {this.props.loading ?
                    <div className="example">
                        <Spin />
                    </div>
                    :
                    <>
                        <div className="testHinh ">

                            {/* <div className="position">
    {danhMucSanPham}
</div> */}

                            <Slider {...setting}>
                                <div>
                                    <img src={Banner} style={{ width: "100% !important" }} alt="test" />
                                </div>
                                <div>
                                    <img src={Banner1} style={{ width: "100% !important" }} alt="test" />

                                </div>
                                <div>
                                    <img src={Banner2} style={{ width: "100% !important" }} alt="test" />

                                </div>
                                {/* <div>
        <img style={{ height: 560, width: 1475 }} src="https://images.tkbcdn.com/1/780/300/Upload/eventcover/2020/07/20/640AF3.jpg" alt="test" />

    </div> */}
                            </Slider>
                            <div className="banner">
                                <img src={view1} alt="" />
                                <img src={view2} alt="" />
                                <img src={view3} alt="" />
                                <img src={view4} alt="" />

                            </div>
                        </div>
                        <div className="container ">
                            <Bounce right>
                                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/giasoc.svg" alt="flash deal" />
                                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/flash.gif" alt="flash deal" />
                                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/homnay.svg" alt="flash deal" />
                            </Bounce>
                            <LightSpeed>

                                <div className="row">
                                    <SellTime danhSachSanPham={this.props.danhSachSalePhanTrang} TrangChu={true} />

                                </div>
                                <NavLink to="/khuyenmai" className="btn btn-primary float-right">Xem tất cả </NavLink>

                            </LightSpeed>

                        </div>
                        <div className="container">
                            <h2>Sản phẩm mới</h2>
                            <LightSpeed>
                                <div className="row">
                                    <SanPhamNew TrangChu={true} danhSachSanPhamNew={this.props.danhSachNewPhanTrang} />
                                </div>
                                <NavLink to="/sanphammoi" className="btn btn-primary float-right">Xem tất cả </NavLink>
                            </LightSpeed>
                        </div>

                        <div className="container danhMuc" style={{ clear: "both" }}>
                            <Fade>
                                <h2> DANH MỤC HOT </h2>
                            </Fade>
                            <div className="row">
                                <div className="col-12 col-md-4 col-lg-2   elementDanhMuc">
                                    <a href="# " className=" card rowDanhMuc">
                                        <div className="image">
                                            <img src="https://salt.tikicdn.com/ts/category/93/27/e3/192b0ebe1d4658c51f9931bda62489b2.png" alt="test" />
                                        </div>
                                        <p className="text-center">Điện Thoại - Máy Tính </p>
                                    </a>

                                </div>
                                <div className="col-12 col-md-4 col-lg-2    elementDanhMuc">
                                    <a href="# " className=" card rowDanhMuc">
                                        <div className="image">
                                            <img src="https://salt.tikicdn.com/ts/category/85/b8/4e/bda4f4c039daa5bb8e6ecdccd7875b08.png" alt="test" />
                                        </div>
                                        <p className="text-center">Thiết Bị Số - Phụ Kiện Số</p>
                                    </a>
                                </div>
                                <div className="col-12 col-md-4 col-lg-2   elementDanhMuc">
                                    <a href="# " className=" card rowDanhMuc">
                                        <div className="image">
                                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/30/ee/5a/dbf45bb1609085f9de51b44e0546dda4.jpg" alt="test" />
                                        </div>
                                        <p className="text-center">Sách Tôn Giáo - Tâm Linh</p>
                                    </a>
                                </div>
                                <div className="col-12 col-md-4 col-lg-2    elementDanhMuc">
                                    <a href="# " className=" card rowDanhMuc">
                                        <div className="image">
                                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/d5/e3/94/25155a809b340414ff5e193e2c638e01.jpg" alt="test" />
                                        </div>
                                        <p className="text-center">Máy Tính Bảng</p>
                                    </a>
                                </div>
                                <div className="col-12 col-md-4 col-lg-2   elementDanhMuc">
                                    <a href="# " className=" card rowDanhMuc">
                                        <div className="image">
                                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/8e/c5/c3/9f680d49c05be61065c81a6e6fce4faa.jpg" alt="test" />
                                        </div>
                                        <p className="text-center">Bài Học Kinh Doanh</p>
                                    </a>
                                </div>
                                <div className="col-12 col-md-4 col-lg-2    elementDanhMuc">
                                    <a href="# " className=" card rowDanhMuc">
                                        <div className="image">
                                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/eb/62/6b/0e56b45bddc01b57277484865818ab9b.jpg" alt="test" />
                                        </div>
                                        <p className="text-center">Sách Kỹ Năng Sống</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="container Sclick">
                            <Fade>
                                <h2> TỪ KHÓA HOT</h2>

                            </Fade>
                            <Slider {...settings} >
                                <div>
                                    <div className="element">
                                        <a className="keywords" href="#" style={{ backgroundColor: 'rgb(22, 112, 46)' }}>
                                            <p>iphone 11</p>
                                        </a>
                                    </div>

                                </div>
                                <div>
                                    <div className="element">
                                        <a className="keywords" href="#" style={{ backgroundColor: 'rgb(22, 112, 46)' }}>
                                            <p>điện thoại</p>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="element">
                                        <a className="keywords" href="#" style={{ backgroundColor: 'rgb(22, 112, 46)' }}>
                                            <p>android</p>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="element">
                                        <a className="keywords" href="#" style={{ backgroundColor: 'rgb(22, 112, 46)' }}>
                                            <p>loa bluetooth</p>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="element">
                                        <a className="keywords" href="#" style={{ backgroundColor: 'rgb(22, 112, 46)' }}>
                                            <p>sạc dự phòng</p>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="element">
                                        <a className="keywords" href="#" style={{ backgroundColor: 'rgb(22, 112, 46)' }}>
                                            <p>đồng hồ </p>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="element">
                                        <a className="keywords" href="#" style={{ backgroundColor: 'rgb(22, 112, 46)' }}>
                                            <p>tai nghe</p>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="element">
                                        <a className="keywords" href="#" style={{ backgroundColor: 'rgb(22, 112, 46)' }}>
                                            <p>bao tay </p>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="element">
                                        <a className="keywords" href="#" style={{ backgroundColor: 'rgb(22, 112, 46)' }}>
                                            <p>airpod</p>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="element">
                                        <a className="keywords" href="#" style={{ backgroundColor: 'rgb(22, 112, 46)' }}>
                                            <p>anker</p>
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <div className="element">
                                        <a className="keywords" href="#" style={{ backgroundColor: 'rgb(22, 112, 46)' }}>
                                            <p>xiaomi</p>
                                        </a>
                                    </div>
                                </div>
                            </Slider>
                            <h3 className="text-center text-primary mt-5">Danh sách sản phẩm</h3>
                            <div className="row">
                                <DanhSachSanPhamm flag={this.flag} />
                                {/* <Pagination defaultCurrent={this.state.page} onChange={this.pageOnChange} total={50} /> */}

                            </div>
                            {this.state.loading ? <div className="example">
                                <Spin />
                            </div> : <></>}
                            <button className="btn btn-outline-primary" style={{ opacity: "0" }} ref="button" onClick={() => this.XemThem(this.state.product)}>Xem thêm</button>
                            <NavLink to="/tatcasanpham" className="btn btn-primary float-right">Xem Tất cả </NavLink>
                        </div>
                    </>
                }
            </>

        );
    }
}
const mapStateToProps = state => ({
    danhSachSanPham: state.productReducers.danhSachSanPham,
    danhMucSanPham: state.productReducers.danhMucSanPham,
    loading: state.productReducers.loading,
    danhSachSalePhanTrang: state.productReducers.danhSachSalePhanTrang,
    danhSachNewPhanTrang: state.productReducers.danhSachNewPhanTrang

})
export default connect(mapStateToProps)(index);