import React , { Component } from 'react';
import {connect} from 'react-redux'; 

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            noteTitle: '',
            noteContent: '',
            cbStar : false
        } 
    }
    componentWillReceiveProps(nextProps){
        
        if(nextProps.editItem){
            this.setState({
                noteTitle : nextProps.editItem.noteTitle,
                noteContent: nextProps.editItem.noteContent,
                id : nextProps.editItem.id,
                cbStar : nextProps.editItem.cbStar
            });
        }else{
            this.setState({
                id: '',
                noteTitle: '',
                noteContent: '',
                cbStar : false
            });
        }

    }
    componentDidMount() {
        if(this.props.editItem){
            this.setState({
                noteTitle : this.props.editItem.noteTitle,
                noteContent: this.props.editItem.noteContent,
                id : this.props.editItem.id,
                cbStar : this.props.editItem.cbStar
            });
        }
       
        console.log('2');
    }
  
    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    isCheck = (event) =>{
        const checked = event.target.checked;
        const name = event.target.name;
        this.setState({
            [name]: checked
        });
    }
    addData = (title,content,cbStar) =>{
        console.log(this.state);
        if(this.state.noteTitle!==''&&this.state.noteContent!==''){
            if(this.props.editItem.id){
                console.log(1);
                var editOject = {};
                editOject.id = this.state.id;
                editOject.noteTitle = this.state.noteTitle;
                editOject.noteContent = this.state.noteContent;
                editOject.cbStar = this.state.cbStar;
                console.log(editOject);
                this.props.updateDataStore(editOject);
                this.props.changeEditStatus(false);
                

            }else{
                console.log(2);
                var item = {};
                item.noteTitle =title;
                item.noteContent=content;
                item.cbStar=cbStar
                // this.props.getData(item);
                this.props.addDataStore(item);
                this.props.changeEditStatus(false);
            }
            
        }
       
    }
    render() {
        return (
           
            <div className="col4">
                <h3>Sửa nội dung Note</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Tiêu Đề Note</label>
                        <input value={this.state.noteTitle} onChange={(event) => this.isChange(event)} type="text" className="form-control" name="noteTitle" id="noteTitle" aria-describedby="helpIdNoteTitle" placeholder="Tiêu Đề Note" />
                        <small id="helpIdNoteTitle" className="form-text text-muted">Điền Tiêu Đề Vào Đây</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="noteContent">Nội Dung Note</label>
                        <textarea value={this.state.noteContent}  onChange={(event) => this.isChange(event)} type="text" className="form-control" name="noteContent" id="noteContent" aria-describedby="helpIdNoteContent" placeholder="Nội Dung Note" />
                        <small id="helpIdNoteContent" className="form-text text-muted">Điền Nội Dung Vào Đây</small>
                    </div>
                    <div className="form-check">
                        <input checked={this.state.cbStar} onChange={(event) => this.isCheck(event)} type="checkbox" className="form-check-input" id="cbStar" name="cbStar" />
                        <label className="form-check-label" htmlFor="cbStar">Quan Trọng</label>
                    </div>
                    <button onClick = {() => this.addData(this.state.noteTitle,this.state.noteContent,this.state.cbStar) } type="reset" className="btn btn-primary btn-block">Lưu</button>
                    <button onClick = {() => this.props.changeEditStatus(false)} type="reset" className="btn btn-primary btn-block">Huỷ</button>
                </form>

            </div>
        );
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        editItem : state.editItem,
        isEdit : state.isEdit
    }
}

const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        addDataStore : (getItem) =>{
            dispatch({
                type:'ADD_DATA',
                getItem
            })
        },
        updateDataStore : (editOject) =>{
            dispatch({
                type:'UPDATE_DATA',
                editOject
            })
        },
        changeEditStatus : (value) =>{
            dispatch({
                type: "CHANGE_EDIT_STATUS",
                value
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NoteForm);