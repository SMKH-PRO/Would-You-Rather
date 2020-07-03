import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/antd/dist/antd.css';
import { Provider } from 'react-redux'
import {store} from './Redux/store'
// import { PersistGate } from 'redux-persist/integration/react'

import Routes from './Routes'
const App=()=> {
  return (
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> Removed on Request in last review. */}
         <Routes/>
    {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
