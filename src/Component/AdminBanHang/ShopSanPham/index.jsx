import React, { Component } from 'react';
import { connect } from 'react-redux';
class index extends Component {
    render() {
        return (
            <div>
                <button className="btn btn-success">Thêm sản phẩm shop</button>
                <h2>Danh sách sản phẩm</h2>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    
})
export default connect(mapStateToProps) (index);