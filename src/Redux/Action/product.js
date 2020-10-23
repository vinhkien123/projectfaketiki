import Swal from 'sweetalert2'
import { createAction } from "."
import { ProductsService } from "../../Services"
import { CHITIETSANPHAM, DANHMUCSANPHAM, DANHSACHDANHMUCCON, DANHSACHNEWPHANTRANG, DANHSACHSALEPHANTRANG, DANHSACHSANPHAM, DANHSACHSANPHAMPHANTRANG, LAYDANHSACHBINHLUAN, LAYDANHSACHBINHLUANCON, LOADING, SAVEDANHMUCCON, SREACHPRODUCTAPI, SREACHTHEODANHMUC } from "./type"


export const DanhSachSanPham = () => {
    return dispatch => {
        ProductsService.danhSachSanPham().then(res => {
            console.log(res.data);
            dispatch(createAction(DANHSACHSANPHAM, res.data.data.products))
            dispatch(createAction(LOADING,false))
        }).catch(err => {
            console.log(err);
        })
    }
}
export const DanhSachDanhMucCon = (id) => {
    return dispatch => {
        ProductsService.danhSachDanhMucCon(id).then(res => {
            dispatch(createAction(DANHSACHDANHMUCCON, res.data.data))
        }).catch(err => {
            console.log(err);
        })
    }
}
export const SaveDanhMucCon = (id) => {
    return dispatch => {
        ProductsService.danhSachDanhMucCon(id).then(res => {
            dispatch(createAction(SAVEDANHMUCCON, res.data.data))
        }).catch(err => {
            console.log(err);
        })
    }
}
export const DanhSachSanPhamPhanTrang = (limit, page) => {
    return dispatch => {
        ProductsService.danhSachSanPhamPhanTrang(limit, page).then(res => {
            console.log(res.data);
            dispatch(createAction(DANHSACHSANPHAMPHANTRANG, res.data.data))
        }).catch(err => {
            console.log(err);
        })
    }
}
export const DanhSachSalePhanTrang = (limit,page) =>{
    return dispatch=>{
        ProductsService.danhSachSalePhanTrang(limit,page).then(res=>{
                dispatch(createAction(DANHSACHSALEPHANTRANG,res.data.data))
        }).catch(err=>{
            console.log(err);
        })
    }
}
export const DanhSachNewPhanTrang = (limit,page) =>{
    return dispatch=>{
        ProductsService.danhSachNewPhanTrang(limit,page).then(res=>{
                dispatch(createAction(DANHSACHNEWPHANTRANG,res.data.data))
        }).catch(err=>{
            console.log(err);
        })
    }
}

// export const XoaSanPham = (id) => {
//         ProductsService.xoaSanPham(id).then(res => {
//             Swal.fire({
//                 position: 'center',
//                 icon: 'success',
//                 title: 'Xóa thành công ! ',
//                 showConfirmButton: false,
//                 timer: 1200
//             });
//         }).catch(err => {
//             console.log(err);
//             Swal.fire({
//                 position: 'center',
//                 icon: 'error',
//                 title: 'Xóa thất bại ! ',
//                 showConfirmButton: false,
//                 timer: 1200
//             });
//         })
// }
export const ThemSanPham = (data) => {

    ProductsService.themSanPham(data).then(res => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm sản phẩm thành công ! ',
            showConfirmButton: false,
            timer: 1200
        });

    }).catch(err => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1200
        });
    })

}
export const CapNhatSanPham = (id, item) => {
    ProductsService.capNhatSanPham(id, item).then(res => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sửa sản phẩm thành công ! ',
            showConfirmButton: false,
            timer: 1200
        });
    }).catch(err => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1200
        });
    })
}
export const ChiTietSanPham = (id) => {
    return dispatch => {
        ProductsService.chiTietSanPham(id).then(res => {


            dispatch(createAction(CHITIETSANPHAM, res.data.data))
            this.setState({
                loading: true
            })
        }).catch(err => {
            console.log(err);
        })
    }
}
export const ThemDanhMuc = (data) => {
    ProductsService.themDanhMuc(data).then(res => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm danh mục thành công ! ',
            showConfirmButton: false,
            timer: 1200
        });

    }).catch(err => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1200
        });
    })
}
export const SreachSanPham = (keyWord) => {
    return dispatch => {
        ProductsService.timKiemSanPham(keyWord).then(res => {
            dispatch(createAction(SREACHPRODUCTAPI, res.data.data.products))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tìm kiếm sản phẩm thành công ! ',
                showConfirmButton: false,
                timer: 1200
            });
        }).catch(err => {
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
export const DanhMucSanPham = () => {
    return dispatch => {
        ProductsService.danhMucSanPham().then(res => {
            dispatch(createAction(DANHMUCSANPHAM, res.data.data))
        }).catch(err => {
            console.log(err);
        })
    }
}
export const DanhSachSanPhamTheoDanhMuc = (id) => {
    return dispatch => {
        ProductsService.danhSachSanPhamTheoDanhMuc(id).then(res => {
            dispatch(createAction(SREACHTHEODANHMUC, res.data))
        }).catch(err => {
            console.log(err);
        })
    }
}
export const SreachTheoDanhMucCon = (id) => {

    ProductsService.sreachDanhMucCon(id).then(res => {
        // dispatch()
        console.log(res.data, "test sreach danh mc");
    }).catch(err => {
        console.log(err);
    })

}
export const themBinhLuanCon = (data,token) =>{
    return dispatch => {
        ProductsService.themBinhLuanCon(data,token).then(res=>{
            dispatch(createAction(LAYDANHSACHBINHLUAN,res.data.data.comment))
        }).catch(err=>{
            console.log(err);
        })
    }
}
export const LayDanhSachBinhLuan = (id) => {
    
    return dispatch => {
        ProductsService.layNhanXetSanPham(id).then(res => {
            console.log(res.data, "binh luận");
            dispatch(createAction(LAYDANHSACHBINHLUAN, res.data.data.comment))

        }).catch(err => {
            console.log(err, "loi binh luan");
        })
    }
}
export const LayDanhSachBinhLuanCon = (IdProduct,IdComment,token) =>{
    return dispatch =>{
        ProductsService.layDanhSachBinhLuanCon(IdProduct,IdComment,token).then(res=>{
            console.log(res.data);
            dispatch(createAction(LAYDANHSACHBINHLUANCON,res.data.data.comment))

        }).catch(err=>{
            console.log(err);
        })
    }
}
export const CapNhatBinhLuan = (data) =>{
    return dispatch => {
        ProductsService.capNhatBinhLuan(data).then(res =>{
            dispatch(createAction(LAYDANHSACHBINHLUAN,res.data.data.comment))
        }).catch(err=>{
            console.log(err, "loi");
        })
    }
}
export const ThemBinhLuan = (id,data,token) =>{
    return dispatch =>{
        ProductsService.themBinhLuan(id,data,token).then(res=>{
            console.log(res.data,"data them");
            dispatch(createAction(LAYDANHSACHBINHLUAN,res.data.data.comment))
        }).catch(err =>{
            console.log(err);
        })
    }
}
export const SreachTheoKhoangGiaDanhMuc = (id, priceStart, come) => {
    return dispatch => {
        ProductsService.sreachTheoKhoangGiaDanhMuc(id, priceStart, come).then(res => {
            console.log(res.data, "da ta nè bạn");
            dispatch(createAction(SREACHTHEODANHMUC, res.data))
        }).catch(err => {
            console.log(err);
        })
    }
}
export const SapXepTheoDanhMuc = (id, status,name) => {
    return dispatch => {
    
        ProductsService.sapXepGiaTheoDanhMuc(id, status,name).then(res => {
            console.log(res.data, "sap xep");
            dispatch(createAction(SREACHTHEODANHMUC, res.data))
        }).catch(err => {
            console.log(err);
        })
    }
}