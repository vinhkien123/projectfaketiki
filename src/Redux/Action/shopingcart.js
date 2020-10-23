import Swal from "sweetalert2";
import { createAction } from ".";
import { ShopingServices } from "../../Services";
import { DANHSACHGIOHANGTHEOUSER, DONHANG, LOADINGGIOHANG, QUANLYDONHANG } from "./type";





export const XoaDanhGioHang = (data, token) => {
    return dispatch => {
        ShopingServices.xoaGioHang(data, token).then(res => {
            dispatch(createAction(DANHSACHGIOHANGTHEOUSER, res.data.data.ListProduct));
            window.location.reload(false);

        }).catch(err => {
            console.log(err);
        })
    }
}
export const ThemGioHang = (data, token, status) => {
    console.log("buoc 0");
    return dispatch => {
        console.log("buoc 1");
        ShopingServices.themGioHang(data, token).then(res => {
            console.log("them gio hangdddddddddddddddddd", res.data);
            dispatch(createAction(DANHSACHGIOHANGTHEOUSER, res.data.data))

            if (status == true) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thêm giỏ hàng thành công ! ',
                    showConfirmButton: false,
                    timer: 1200
                });
            }


        }).catch(err => {
            console.log(err);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: err.response?.data.message,
                showConfirmButton: false,
                timer: 1200
            });
        })
    }
}
export const GiamGioHang = (data, token) => {
    return dispatch => {
        ShopingServices.giamSoLuongGioHang(data, token).then(res => {
            console.log("them gio hangdddddddddddddddddd", res.data);
            dispatch(createAction(DANHSACHGIOHANGTHEOUSER, res.data.data))




        }).catch(err => {

        })
    }
}
export const SanPhamXoa = (data, token) => {
    return dispatch => {
        ShopingServices.xoaGioHang(data, token).then(res => {
            // window.location.reload(false);
            dispatch(createAction(DANHSACHGIOHANGTHEOUSER, res.data.data))
        }).catch(err => {
            console.log(err);
        })
    }
}
export const LayDanhSachGioHangUser = (id, token,setLoading) => {
    return dispatch => {
        console.log("API giỏ hàng");
        ShopingServices.layDanhSachGioHangTheoUser(id, token).then(res => {
            console.log("redux", res.data.data.ListProduct);
            dispatch(createAction(DANHSACHGIOHANGTHEOUSER, res.data.data))
          
        }).catch(err => {
            console.log("kthanhcong");
            console.log("al", err);
        })
    }
}
export const QuanLyDonHang = (token) => {
    return dispatch => {
        ShopingServices.quanLyDonHang(token).then(res => {
            console.log(res.data.data.orders,"??don hang");

            dispatch(createAction(QUANLYDONHANG, res.data.data))
        }).catch(err => {
            console.log(err);
        })
    }
}
export const DonHang = (url,token) => {
    console.log("?SA?AS?SA");
    return dispatch => {
        ShopingServices.donHang(url,token).then(res => {
            console.log(res.data,"don hang kien");

            dispatch(createAction(DONHANG, res.data.data))
        }).catch(err => {
            console.log(err,"Errrrrrrrrr");
        })
    }
}