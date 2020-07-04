import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Avatar, Badge,Tooltip, } from 'antd';
import {ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import Card from '../Components/Card'
import { Tabs } from 'antd';
import { _getQuestions, _getUsers } from '../Enums/_DATA'
import { setState,setTitle} from '../Redux/actions'
import "../Assets/CSS/home.css"
import Loading from '../Components/Loading'

const { TabPane } = Tabs;

const Home = props => {
    // Get dispatch
    const dispatch = useDispatch();
    const InitialLoading = useSelector((state) => state.InitialLoading);//REDUX STATE
    const questions = useSelector((state) => state.questions);
    const user = useSelector((state) => state.user);
    const users = useSelector((state) => state.users);



    useEffect(() => {
        dispatch(setTitle("Home"))
    }, [])

    


    const loading = !questions || !Array.isArray(questions)|| InitialLoading 

    //  author: "sarahedo"
    //  id: "8xf0y6ziyjabvozdd253nd"
    //  optionOne: {votes: Array(1), text: "have horrible short term memory"}
    //  optionTwo: {votes: Array(0), text: "have horrible long term memory"}
    //  timestamp: 1467166872634


    const unanswered = Array.isArray(questions)&& questions.filter(d => !d.optionOne.votes.includes(user.id) && !d.optionTwo.votes.includes(user.id))
    
    const answered = Array.isArray(questions)&& questions.filter(d => d.optionOne.votes.includes(user.id) || d.optionTwo.votes.includes(user.id))
    console.log("una=>", unanswered, "ans=>", answered)
    unanswered.sort((a,b)=>b.timestamp-a.timestamp)
    answered.sort((a,b)=>b.timestamp-a.timestamp)

    
      return (
        <div>
            <style>
                {
                    //Specific Css only for this component, not having effect on others.
                    `
                  main.ant-layout-content.site-layout-background {
                    background: #f0f2f5 !important;
                  }
                  
               `
                }
            </style>
            <div className="card-container">
                <Tabs type="card">
                    {JSON.stringify(loading)}
                    <TabPane disabled={loading}
                        tab={<p>
                            Un-Answered Question(s) &nbsp;
                                <Badge className="site-badge-count-109" count={unanswered.length} style={{ backgroundColor: '#52c41a' }} />

                        </p>}
                        key="1">
                        {!loading ?
                            <div className="tabChild">

                                {(Array.isArray(unanswered)&&unanswered.length>0)?
                                 unanswered.map((q) => <PollCard history={props.history} q={q} author={users[`${q.author}`]} />)
                                 :
                                 <h1 style={{textAlign:'center',margin:20}}>No Un-Answered Questions Found !
                                 </h1>
                                }

                            </div> :
                            <div className="tabChild"><br /><br />
                                <Loading style={{ marginTop: 20 }} />
                            </div>}
                    </TabPane>
                    <TabPane disabled={loading} tab={<p>
                            Answered Question(s) &nbsp;
                                <Badge className="site-badge-count-109" count={answered.length} style={{ backgroundColor: '#52c41a' }} />

                        </p>} key="2">
                        {!loading ?
                            <div className="tabChild">
                                 {(Array.isArray(answered)&&answered.length>0)?
                                 answered.map((q) => <PollCard history={props.history} q={q} author={users[`${q.author}`]} />)
                                 :
                                 <h1 style={{textAlign:'center',margin:20}}>No Answered Questions Found !</h1>
                                }

                            </div> :
                            <div className="tabChild">
                                <br /><br />
                                <Loading />
                            </div>}
                    </TabPane>

                </Tabs>
            </div>

        </div>
    )
}

const PollCard = (props) => {

   
console.log("PROPS=>",props)
const poll= props.q
const author= props.author
const time=new Date(poll.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12:true })
const date= new Date(poll.timestamp).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
const optionOneText=poll&&poll.optionOne&& poll.optionOne.text
const optionTwoText= poll&& poll.optionTwo&& poll.optionTwo.text


const responsiveWidth={minWidth:200,maxWidth:330,width:'100%'}
return <Card {...props} 
              child={
              <Link to={`/questions/${poll&&poll.id}`}> 
                   <Button  style={{borderRadius:5,...responsiveWidth ,bottom:0}} type="primary">
                       View Poll <ArrowRightOutlined />
                   </Button></Link>
            } 
        />
}

export default Home


