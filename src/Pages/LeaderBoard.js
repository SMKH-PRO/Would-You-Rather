import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Avatar, Badge, Tooltip, Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
import { _getQuestions, _getUsers } from '../Enums/_DATA'
import { setState, setTitle } from '../Redux/actions'
import "../Assets/CSS/home.css"
import Loading from '../Components/Loading'
import "../Assets/CSS/LeaderBoard.css"

const LeaderBoard = () => {
    const users = useSelector(state =>  state.users)
    const dispatch = useDispatch()

    useEffect(() => {
         dispatch(setTitle("Leader Board"))
    }, [])

    console.log("ww",users)
    const usersArray=Object.values(users)
    const usersWithScore = Array.isArray(usersArray) && getUsersScore(usersArray)   
    usersWithScore.sort((a,b)=>b.score-a.score)//sort by score.
    return (
        <div >
           {usersWithScore&&Array.isArray(usersWithScore)&&usersWithScore.map((user,i)=>{

               return <UserCard user={user} rank={i+1} score={user.score}/>
           })}
        </div>
    )
}

const getUsersScore=(usersarray)=>{
  return  usersarray&&usersarray.map(user=>{
        
        let totalAns=0
        let totalQuest= 0
        let answered= user&&user.answers? Object.values(user.answers).length:0
        let created=user&&user.questions&&Array.isArray(user.questions)?user.questions.length:0
        if(answered) totalAns= answered ;
        if(created) totalQuest=created;
        // console.log("ta=> ",totalAns," tQ=> ",totalQuest)
        let data= {...user,score:parseInt(totalAns)+parseInt(totalQuest),created,answered}
       // console.log("dataaaaaaaa ",data)
        return data
    })
}

const UserCard = (props) => {
   const user= props && props.user
   const name = user&&user.name
   const avatarURL= user&&user.avatarURL

   const responsiveWidth={minWidth:200,maxWidth:250,width:'100%'}
const style=props.style?props.style:{...responsiveWidth ,display:'inline-block',margin:10,borderRadius:10,textAlign:'left',overflow: 'hidden',position:'relative',}
    return <Card
        hoverable
        style={style}
        cover={<img style={{height:160}} alt="Avatar" src={avatarURL} />}
    >
    <h1 style={{margin:15}}>{name}   -   <span style={{color:'gray',fontSize:14,fontWeight:'initial'}}>Rank #{props.rank}</span>
 </h1>

        <Card.Grid  className="FirstGrid NoBorder" hoverable={false} style={{width:'70%'}}>
            <p className="achievementPara"><b>Answered: </b> {user.answered}</p>
            <p className="achievementPara"><b>Created: </b> {user.created}</p>
        </Card.Grid>
    <Card.Grid className="NoBorder" hoverable={false}  style={{width:'30%',borderBottomWidth:0,borderRight:0}}>
        Score: 
          <Badge count={props.score} />
    </Card.Grid>
    </Card>
}
export default LeaderBoard
