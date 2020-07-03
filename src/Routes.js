import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Question from './Pages/Question'
import SubmitPoll from './Pages/SubmitPoll'
import LeaderBoard from './Pages/LeaderBoard'
import NotFound from './Pages/404'
import { _getQuestions, _getUsers } from './Enums/_DATA'
import { setState} from './Redux/actions'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Wrapper from './Components/UIWrapper'



const RoutesList = [

    {
        title: 'Home',
        path: '/',
        Component: Home
    },
    {
        title: 'Login',
        path: '/Login',
        Component: Login,
        isNotLogical:true
    }
    ,
    {
        title: 'Question',
        path: '/q/:QID', //Question ID
        Component: Question,
    },
    {
        title: 'Add Poll',
        path: '/Add', //Question ID
        Component: SubmitPoll,
    },
    {
        title: 'Leader Board',
        path: '/Leaderboard', //Question ID
        Component: LeaderBoard,
    }
]



const Routes = () => {
    const user = useSelector((state) => state.user);//REDUX STATE
    const isLoggedIn=user&&user.id
    const LogicalComponent = (props) => isLoggedIn ? <props.child {...props} /> : <Redirect to={"/Login?r="+props.path} />
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setState({getInitialData:LoadData}))
        LoadData()        
    }, [])
    const LoadData=(callBack=false)=>{
        dispatch(setState({InitialLoading:true}))
        _getUsers().then(result => {
            
            dispatch(setState({ users:result}))
            console.log(result)
        })
        _getQuestions().then(result => {
            let questions = Object.values(result)
            dispatch(setState({ questions,InitialLoading:false }))
            console.log(questions)
            if(callBack){
                callBack()
            }
        })
    }
    return (
        <Router>
            <Wrapper>

                <Switch>
                    {RoutesList.map((route, i) => (
                        <Route key={i} exact path={route.path}  render={props=>
                            route.isNotLogical?<route.Component  {...props} />
                                                :
                                               <LogicalComponent  {...props} 
                                                                 path={route.path} 
                                                                 child={route.Component}  />
                        }/>
                    ))}

                 <Route component={NotFound} />

                </Switch>
            </Wrapper>
        </Router>
    )
}

export default Routes
