import {TYPES} from './actions'
// import {  persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// const persistConfig = {
//     key: 'root',
//     storage,
//   }
export const initialState = {
    user:null,//Object expected.
    questions:null,
    users:null,
    title:'',
    getInitialData:()=>console.log("Default Function"),
    InitialLoading:false
  };
  

const  reducer=(state=initialState, action)=> {
    switch (action.type) {
      case TYPES.SETSTATE:
        return Object.assign({}, state, {
            ...action.payload 
          })
          
    
      default:
        return state;
    }
  }

  // export default persistReducer(persistConfig, reducer) ;

  export default reducer