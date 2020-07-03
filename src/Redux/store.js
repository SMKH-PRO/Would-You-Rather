import { createStore } from 'redux';
import reducer,{initialState} from './reducer'
// import { persistStore,  } from 'redux-persist'

 export const store = createStore(
  reducer,
  initialState ,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
//  export const persistor = persistStore(store)


// export default store


