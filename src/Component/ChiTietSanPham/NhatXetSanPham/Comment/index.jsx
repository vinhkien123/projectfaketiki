import { Button, Dropdown, Menu } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            update: false,
            Content : this.props.item.Content,
        }
    }
    update = () => {
        this.setState({
            update: true
        })
    }
    hanldeOnChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    upload = () =>{
        // console.log(this.refs.input.value);
        this.setState({
            update: false,
        })
        const data = {
            IdProduct: this.props.IdProduct,
            IdComment: this.props.IdComment,
            Content : this.state.Content
        }
        this.props.capNhatBinhLuan(data)
        this.setState({
            Content : ""
        })
    }
    huy = () => {
        this.setState({
            update: false,
            Content : this.props.item.Content
        })
    }
    xoaBinhLuan = (id) =>{
        this.props.xoaBinhLuan(id)
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
        let render
        const user = JSON.parse(localStorage.getItem('user'))
        let text = this.props.item.Content
        if(user){
            render = user.user._id == this.props.item.IdUser ?
            <div className="" style={{
                display: "flex", justifyContent: "flex-end"
            }}>
                <Dropdown overlay={() => this.Menu(this.props.item)} placement="bottomRight" arrow>
                    <Button>...</Button>
                </Dropdown>
            </div>
            : "" 
        }
        return (
            <>
                <div className="title-infor d-flex" >
                    <p className="star-infor">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                    </p>
                    <span>Hài lòng</span>

                    {render}
                </div>
                <p className="pur-infor d-flex align-items-center">
                    <span className="img-pur d-inline-block" /> Đã mua hàng
                             </p>
                {
                    !this.state.update ?
                        <p className="content">
                            {this.props.item.Content}
                        </p> :
                        <textarea name="Content" id="" cols="30" ref="input" value={this.state.Content}
                            onChange={this.hanldeOnChange} style={{ width: "100%" }}
                            className="form-control" placeholder="Bình luận ..." rows="5"></textarea>
                }
                <div className="" style={{
                    display: "flex", justifyContent: "flex-end"
                }}>

                    {  this.state.update ?
                        <>
                            <button className="btn btn-warning" onClick={this.upload}>Lưu</button>
                            <button className="btn btn-outline-info ml-2" onClick={this.huy}>Hủy</button>
                        </>
                        : ""}
                </div>
            </>
        );
    }
}
const mapStateToProps = state => ({
    binhLuan: state.productReducers?.layDanhSachBinhLuan

})
export default connect(mapStateToProps)(index);