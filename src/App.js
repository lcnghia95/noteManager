import React, { Component } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import NoteNav from './components/NoteNav';
import {firebaseConnect} from './components/firebaseConnect';
import { connect } from 'react-redux';

class App extends Component {

  showForm = () => {
    if(this.props.isEdit){
      return (
        <NoteForm/>
      )
    }
  }
  render(){   
    return (   
      <div>
          <NoteNav/>
          <div className="container">
            <div className="row">
              <NoteList/>
              {this.showForm()}  
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps= (state,ownProps)=>{
  return {
    isEdit : state.isEdit
  }
}


export default connect(mapStateToProps)(App);
