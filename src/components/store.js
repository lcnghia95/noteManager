import { firebaseConnect } from './firebaseConnect';

var redux = require('redux');

const noteInitialState = {
    isEdit: false,
    statusCheck : false,
    statusUpdate: false,
    editItem : ''
}
const allReducer = (state = noteInitialState, action) => {
    switch (action.type) {
        case "ADD_DATA":    
            firebaseConnect.push(action.getItem);
            return {...state,editItem:{}};
        case "CHANGE_EDIT_STATUS":
            if(action.value)
                return {...state,isEdit:action.value};
            return {...state,isEdit:action.value,editItem:''};
        case "GET_EDIT_DATA" : 
            return {...state,editItem:action.editOject};
        case "UPDATE_DATA" : 
            console.log(action.editOject);
            firebaseConnect.child(action.editOject.id).update({
                noteTitle : action.editOject.noteTitle,
                noteContent : action.editOject.noteContent,
                cbStar : action.editOject.cbStar
            });
            return {...state,editItem:{}};
        case "DELETE_DATA" : 
            console.log(action.deleteItem);
            firebaseConnect.child(action.deleteItem.id).remove();
            return {...state}
        default:
            return state
    }
}


var store = redux.createStore(allReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(function(){
    console.log(JSON.stringify(store.getState()));
})
export default store;