import React from 'react'
import { Button, Card, Avatar, Badge,Tooltip, } from 'antd';

const CardWrapper = (props) => {
    console.log("USERRRRRRRRRR=>",props.author,"QUest==>> ",props.q)
const poll= props.q
const author= props.author?props.author:{avatarURL:"https://avatars.dicebear.com/v2/avataaars/1.svg",name:'Sarah Edo,',id:'guest'}
const timeStamp = (poll&&poll.timestamp)?poll.timestamp:new Date().getTime()
const time=new Date(timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12:true })
const date= new Date(timeStamp).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
const optionOneText=poll&&poll.optionOne&& poll.optionOne.text
const optionTwoText= poll&& poll.optionTwo&& poll.optionTwo.text

const hasQuests= optionOneText &&optionTwoText

const responsiveWidth={minWidth:200,maxWidth:330,width:'100%'}
const style=props.style?props.style:{...responsiveWidth ,maxHeight:'90%',maxHeight:280,display:'inline-block',margin:10,borderRadius:10,textAlign:'left',overflow: 'hidden',position:'relative',}
return (
        <Card hoverable style={style} >
            <Card.Meta
                avatar={
                    <Avatar size={60} src={author&&author.avatarURL} />
                }
                title={<span style={{textTransform:'uppercase'}}>{author&&author.name}</span>}
                description={ <Tooltip  title={time&&time}>
                                 <span style={{fontSize:12}}> {date&&date}</span>
                              </Tooltip>
                             }
            />
            <br />
            {hasQuests&&<p  >Would you rather <b>{optionOneText&&optionOneText}</b> or <b>{optionTwoText&&optionTwoText}</b> ?  </p>}
               {props.child}
        </Card>)
}

export default CardWrapper
