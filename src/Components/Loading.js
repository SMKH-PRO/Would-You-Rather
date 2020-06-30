import React from 'react'
import { Spin, Alert } from 'antd';


const Loading =(props)=>{
    let style=props&&props.style?props.style:{}
return   <div style={{margin:20,textAlign:'center',verticalAlign:'center',...style}}>
                  <Spin tip="Loading..."/>
         </div>
}

  export default Loading