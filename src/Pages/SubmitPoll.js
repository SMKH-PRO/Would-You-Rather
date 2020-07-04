import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setState,setTitle} from '../Redux/actions'
import {Input,Button} from 'antd'
import Card from '../Components/Card'
import { _saveQuestion } from '../Enums/_DATA'
import Loading from '../Components/Loading'
import "../Assets/CSS/SubmitPoll.css"
const SubmitPoll = (props) => {
    const questions = useSelector((state) => state.questions);
    const getInitialData = useSelector((state) => state.getInitialData);
    const InitialLoading = useSelector((state) => state.InitialLoading);

    const user = useSelector((state) => state.user);
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch()
    const [textOne, setTextOne] = useState("")
    const [textTwo, setTextTwo] = useState("")
   
    const onChangeOne=e=>{
     if(e&&e.target&&e.target.value){
        setTextOne(e.target.value)
     }
    }
    const onChangeTwo=e=>{
        if(e&&e.target&&e.target.value){
            setTextTwo(e.target.value)
        }
       }

       useEffect(() => {
           
        dispatch(setTitle("Add New Poll"))
    
       }, [])
   

    const AddQuestion=()=>{
//{ optionOneText, optionTwoText, author }
      if(textOne.length<3){
          alert("Write atleast 3 characters in option one .")
      }
      else if(textTwo.length<3){
        alert("Write atleast 3 characters in option one .")
       }else{
            dispatch(setState({InitialLoading:true}))
          _saveQuestion({optionOneText:textOne,optionTwoText:textTwo,author:user.id}).then(q=>{
               dispatch(setState({questions:q.questions,users:q.users}))
               getInitialData(()=>{
                   props.history.push(`/questions/${q.id}`)
               })

          })
       }
    }

    const isLoading=InitialLoading
    return (

        isLoading?<Loading />:
        <div style={{textAlign:'center',paddingTop:'6%'}}>
            {<PollCard author={user}  
                       child={
                           <div>
                               <p>Would You Rather</p>
                               <Input  onChange={onChangeOne} placeholder="Option Number One " className="questionSubmitInput" value={textOne}   />
                               <p style={{ textAlign: 'center', margin: '15px auto', fontWeight: 'bold', color: 'white', textShadow: '0px 0px 3px black' }}>OR</p>

                               <Input  onChange={onChangeTwo} placeholder="Option Number Two " className="questionSubmitInput" value={textTwo} />

                               <Button type="primary" onClick={AddQuestion} style={{width:'96%',margin:10,marginTop:20}} >Submit</Button>
                          </div>
                       }
             />}
        </div>
    )
} 

const responsiveWidth = { minWidth: 200, maxWidth: 500, width: '100%' }
const style={ ...responsiveWidth, display: 'inline-block', margin: 10, borderRadius: 10, textAlign: 'left', overflow: 'hidden', position: 'relative', paddingBottom: 10 }

const PollCard = (props) => {
    
    return <Card style={style} {...props} />
    }
export default SubmitPoll
