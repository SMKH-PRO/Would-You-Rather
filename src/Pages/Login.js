import React, { useState,useEffect } from 'react'
import { users } from '../Enums/_DATA'
import {setState,setTitle} from '../Redux/actions'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Select } from 'antd';
const { Option } = Select

const Avatar = (props) => <img {...props}  width={props&&props.width?props.width:30} />
const Login = (props) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const userr= useSelector(state=>state.user)
    const isLoggedIn= userr&&userr.id
   

    useEffect(() => {
        dispatch(setTitle("Login"))
    }, [])

    useEffect(() => {

        if(isLoggedIn){
            let RedirectTo= props?.location?.state?.pathname
            props.history.push(RedirectTo?RedirectTo:"/")
        }
    }, [isLoggedIn])

    const onChange = (value) => {
        setUser(JSON.parse(value))
    }

    const LoginNow=()=>{
        
        dispatch(setState({user}))
     // alert("done")
    }
    
    const userss = Object.values(users)
    return (
        <div>
            <Card hoverable bordered title="LOGIN REQUIRED" style={{ width: '98%', maxWidth: 500, margin: '5% auto', borderRadius: 10 }}>
                <h4>Please login to continue</h4>
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Select a user"
                    optionFilterProp="children"
                    onChange={onChange}

                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >

                    {userss && userss.map(usr => <Option value={JSON.stringify(usr)}><Avatar src={usr.avatarURL} /> {usr.name}</Option>)}


                </Select>
                <p style={{marginTop:10,marginBottom:20}}>Select a user from the dropdown and click on "Login" button below, This is a demo that's why actual password or signup is not required.</p>
                <Button type="primary" shape="round" onClick={LoginNow} disabled={!user} style={{width:'100%',fontWeight:'bold',textTransform:'uppercase'}}>
                   {user ? `Login as` : 'Login'}
                   {user && 
                        <span>  
                            <Avatar className="LoginBtnAvtar" width={20}  src={user.avatarURL} /> 
                            {user.name}
                         </span>}
                </Button>

       

            </Card>

        </div>
    )
}

export default Login
