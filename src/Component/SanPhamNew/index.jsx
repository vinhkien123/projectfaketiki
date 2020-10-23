import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import New from '../../asset/data/img/logomoi.png';
import Time from '../Time';
class index extends Component {
    onClickSave = (sanPham) => {
        let array, flag
        ///// Kiểm tra có chuỗi JSON sản phẩm không
        if (localStorage.getItem('sanPham')) {
            // chuyển từ chuỗi JSON sang array chứa object sản phẩm
            array = JSON.parse(localStorage.getItem('sanPham'))
            /////Kiểm tra những sản phẩm có trong array hay không
            flag = true
            for (let i = 0; i < array.length; i++) {
                if (sanPham._id == array[i]._id) {
                    flag = false
                }
            }
            //// Nếu không bằng sẽ thêm vào array
            if (flag == true) {
                // thêm vô 1 object sản phẩm vào array chứa object sản phẩm
                array.push(sanPham)
            }

            /////// chuyển từ array sang chuỗi json =>>> đưa chuỗi json lên localStorage 
            localStorage.setItem('sanPham', JSON.stringify(array))
        }
        ///// Nếu không có thì tạo 1 cái array mới
        else {
            array = []
            array.push(sanPham)
            localStorage.setItem('sanPham', JSON.stringify(array))

        }
        // setTimeout(() => {
        //     window.location.reload(false);
        // }, 1)
        setTimeout(() => {
            localStorage.removeItem('sanPham')
        }, 180000)

    }
    renderElement(item, index) {
        const giaGiam = (item.Price - (item.Price / 100 * item.Sale)).toString().replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, ",")
        const giaSanPham = item.Price.toString().replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, ",")
        return (
            <NavLink to={`/chitietsanpham/${item._id}`} onClick={() => this.onClickSave(item)} className="card-tiki" style={{ position: "relative",width:"20%" }} key={index}>
                <div className="card text-left" >
                    <div className="hinhAnh">
                        <img className="card-img-top" src={item.Image} alt />

                        <div className="button">
                            <div className="center">
                            </div>
                            <div className="center">
                                <button className="btn btn-outline-success muaVe">Xem chi tiết</button>

                            </div>
                        </div>
                        <div className="bg"></div>
                        <div className="card-body">

                            <h4 className="card-title">{item.Name.length > 44 ? item.Name.slice(0, 44) + "...." : item.Name}</h4>
                            <div className="price">
                                <p className="card-text text-danger text-center gia-hover">{giaGiam}&nbsp; ₫</p>

                                {item.StatusSale == true ?
                                    <p className="sellPrice">{giaSanPham} ₫</p>
                                    : <> </>
                                }
                            </div>
                            <span className="new">
                                <img src={New} width={40} height={36} alt="test" />
                            </span>
                            {item.StatusSale == true ?
                                <span className="giamGia">-{item.Sale}%</span> : ""
                            }

                            <div className="bottom">
                                <div className="sellTime">
                                    <div className="sell">
                                        <div className="products">
                                            <div className="width-sell" style={{ width: "20%" }}></div>
                                            <div className="content-sell">
                                                <span><i class="fa fa-fire"></i></span>
                                                <p className="text">Đã bán 1</p>
                                            </div>
                                        </div>
                                        {item.StatusSale == true ?
                                            <Time time={item.ExpirationDateSale} id={item._id} item={item} />
                                            : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* <Time /> */}

                        </div>
                    </div>

                </div>
            </NavLink>
        )
    }
    render() {
        console.log(this.props.danhSachSanPhamNew,"?new");
        // const danhSachSale = this.props.danhSachSanPham.filter(item => item.Warranty == true)
        let elementSellTime;
        if (this.props.TrangChu == true) {
            elementSellTime = this.props.danhSachSanPhamNew?.products?.map((item, index) => {
               
                    return this.renderElement(item, index)
                
            })
        }
        else {
            elementSellTime = this.props.danhSachSanPhamNew?.products?.map((item, index) => {
                return this.renderElement(item, index)
            })
        }
        return (
            <>
                {elementSellTime}
            </>
        );
    }
    componentDidMount() {
        document.body.scrollTop = 0;
        // or
        window.scrollTo(0, 0);
    }
}

const mapStateToProps = state => ({
    danhSachSanPham: state.productReducers.danhSachSanPham
})
export default connect(mapStateToProps)(index);