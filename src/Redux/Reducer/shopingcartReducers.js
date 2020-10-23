import { DANHSACHGIOHANGTHEOUSER, DONHANG, LOADING, LOADINGGIOHANG, QUANLYDONHANG, THONGTINGIAOHANG } from "../Action/type";

const initialState = {
    danhSachGioHangTheoUser: [],
    thongTinGiaoHang: [],
    quanLyDonHang : [],
    donHang : [],
    loadingGioHang : true,

}
const shoppingcartReducers = (state = initialState, action) => {
    switch (action.type) {
        case DANHSACHGIOHANGTHEOUSER:
            console.log("testredux", action.payload);
            state.danhSachGioHangTheoUser = action.payload
            return { ...state }
        case THONGTINGIAOHANG:
            state.thongTinGiaoHang = action.payload
            return { ...state }
        case QUANLYDONHANG:
            state.quanLyDonHang = action.payload
            return{...state}
        case DONHANG:
            state.donHang = action.payload
            return{...state}
        case LOADINGGIOHANG:
            state.loadingGioHang = action.payload
        default:
            return { ...state }
    }
}
export default shoppingcartReducers