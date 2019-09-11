import React, { Component } from 'react';
import NoteItem from './NoteItem';
import { firebaseConnect } from './firebaseConnect';
import { connect } from 'react-redux';

class NoteList extends Component {
    constructor(props){
        super(props);
        this.state = { 
            datatFirebase: []
        }
    }
    componentWillMount() {
        firebaseConnect.on('value', (notes) => {
            var arrData = [];   
            notes.forEach(element =>{
                const key = element.key;
                const noteTitle = element.val().noteTitle;
                const noteContent = element.val().noteContent;
                const cbStar = element.val().cbStar;
                arrData.push({id : key,noteTitle,noteContent,cbStar});
                 
            });
            this.setState({
                datatFirebase : arrData
            });
        });

    }
    getData = () => {
        
       if(this.state.datatFirebase){
            return this.state.datatFirebase.map((value,key)=>{
                    return (
                        <NoteItem
                            i ={key}
                            note = {value}
                            key={value.id}
                            noteTitle={value.noteTitle}
                            noteContent = { value.noteContent}
                            cbStar = { value.cbStar }
                        />
                    );
            });
       }
        
    }

   
    render() {
        return (
            <div className="col">
                <div>
                    <button 
                        className="btn btn-outline-secondary"
                        onClick = { () => this.props.changeEditStatus(true)}
                    >Thêm Mới</button>
                </div><br/>

                <div id="noteList" role="tablist" aria-multiselectable="true">
                    { this.getData()}
                    {/* <NoteItem/>
                    <NoteItem/>
                    <NoteItem/>
                    <NoteItem/>            */}
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state,ownProps)=>{
    return {
        isEdit : state.isEdit
    }
}

const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        changeEditStatus : (value) =>{
            dispatch({
                type: 'CHANGE_EDIT_STATUS',
                value
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NoteList);