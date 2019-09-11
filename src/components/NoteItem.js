import React, { Component } from 'react';
import { connect } from 'react-redux';
class NoteItem extends Component {

    twoActionButton = () => {
        this.props.changeEditStatus(true);
        //hàm lấy nội dung truyền vào trong store để update dữ liệu
        this.props.getEditData(this.props.note);
    }

    deleteData = () =>{
        this.props.deleteData(this.props.note);
    }
    iscbStar = () =>{
        if(this.props.note.cbStar){
            return 'fa fa-star';
        }
        return 'fa fa-star-o';
    }
    changeCbStar = () =>{
        this.props.note.cbStar =!this.props.note.cbStar;
        this.props.changeCbStar(this.props.note);
    }
    render() {
        return (

            <div className="card">
                <div className="card-header" role="tab" id="note1">
                   
                    <h5 className="mb-0">  
                        <a  className="float-left title" data-toggle="collapse" data-parent="#noteList" href={"#number"+this.props.i} aria-expanded="true" aria-controls="noteContent1">                         
                           {this.props.noteTitle}
                        </a>
                        <ul className="rating float-left">
                            <i 
                                className={this.iscbStar()}                                
                                onClick = { () => this.changeCbStar()}
                            ></i>
                        </ul>
                        <div className="btn-group float-right title">
                            
                            <button className="btn btn-outline-info" onClick = { () => this.twoActionButton()}  >Sửa</button>
                            <button 
                                className="btn btn-outline-secondary"
                                onClick = { () => this.deleteData()}
                            >Xoá</button>
                        </div>
                    </h5>
                </div>
                <div id={"number" + this.props.i} className="collapse in" role="tabpanel" aria-labelledby="note1">
                    <div className="card-body">
                        {this.props.noteContent}
                            </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state,ownProps)=>{
    return {
        isEdit : state.isEdit,
        editItem : state.editItem
    }
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        changeEditStatus : (value) =>{
            dispatch({
              type: 'CHANGE_EDIT_STATUS',
              value
            })
        },
        getEditData : (editOject) =>{
            dispatch({
                type : 'GET_EDIT_DATA',
                editOject
            })
        },
        deleteData : (deleteItem) =>{
            dispatch({
                type: 'DELETE_DATA',
                deleteItem
            })
        },
        changeCbStar : (editOject) =>{
            dispatch({
                type: 'UPDATE_DATA',
                editOject
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NoteItem);