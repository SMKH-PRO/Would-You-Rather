import React, { useState, useEffect } from 'react'
import { setState, setTitle } from '../Redux/actions'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Avatar, Tooltip, Progress, Tag } from 'antd';
import { _getQuestions, _getUsers,_saveQuestionAnswer } from '../Enums/_DATA'
import Loading from '../Components/Loading'
import { ArrowRightOutlined } from '@ant-design/icons'
import Card from '../Components/Card'

import { Link } from 'react-router-dom';
import "../Assets/CSS/Questions.css"

const Question = (props) => {
    const [selectedQuestion, setQuestion] = useState(false)
    const questions = useSelector(state => state.questions)
    const user = useSelector(state => state.user)
    const InitialLoading = useSelector(state => state.InitialLoading)

    const getInitialData = useSelector(state => state.getInitialData)

    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(setTitle("Poll"))
        getInitialData()
        getSelectedQuestion()

    }, [])

    const getSelectedQuestion = async () => {
        let QID = props.match.params.QID
        if (QID) {
            let QuestionSelected = questions && questions.filter(d => d.id == QID)[0] //Incase if already available in Redux state then we won't need to load from API, this will save user's time and make UX better.
            
            if (QuestionSelected) {
                setQuestion(QuestionSelected)
            } else{
 
                if(!QuestionSelected){//question not found.
                    props.history.push("/404")

                }
               
            }
        } else {
            props.history.push("/404")

        }

    }

    const Vote = (VoteNum) => {//{ authedUser, qid, answer }
        let selectedOption = selectedQuestion && VoteNum == 1 ? "optionOne" : "optionTwo"
        let SelectedQ = selectedQuestion
        let opt = SelectedQ && SelectedQ[selectedOption]

        Object.assign(SelectedQ, { [selectedOption]: { votes: [...opt.votes, user.id], text: opt.text } })

        let AllQuestionsWithoutThis = questions && questions.filter(d => d.id !== selectedQuestion.id)

        let withNewVote = [...AllQuestionsWithoutThis, SelectedQ]

        dispatch(setState({ questions: withNewVote }))
        saveAnswer(VoteNum)
    }


    const saveAnswer=(VoteNum)=>{
        let selectedOption = selectedQuestion && VoteNum == 1 ? "optionOne" : "optionTwo"
        let qid=selectedQuestion && selectedQuestion.id
        let id = user.id
    _saveQuestionAnswer({authedUser:id,qid,answer:selectedOption})
    getInitialData()
}

    let loading = (!(selectedQuestion && selectedQuestion.id)) || InitialLoading
    return (
        !loading ?
            <div style={{ textAlign: 'center',paddingTop:'4%' }}>

                <PollCard Vote={Vote} q={selectedQuestion} />
                
            </div>
            :
            <Loading style={{ marginTop: '5%' }} />

    )
}


const PollCard = (props) => {
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)

    console.log("PROPS=>", props)
    const poll = props && props.q
    const author =( poll && poll.author)&&users[poll.author]
    const optionOne = poll && poll.optionOne
    const optionTwo = poll && poll.optionTwo
    const optionOneText = optionOne && optionOne.text
    const optionTwoText = optionTwo && optionTwo.text
    const opOne = optionOne && optionOne.votes
    const opTwo = optionTwo && optionTwo.votes
    const optionOneVotes = opOne.length 
    const optionTwoVotes = opTwo.length
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOneVotesPercent = parseInt(optionOneVotes * 100 / totalVotes)
    const optionTwoVotesPercent = parseInt(optionTwoVotes * 100 / totalVotes)
    const userVotedOpOne = opOne.includes(user && user.id)
    const userVotedOpTwo = opTwo.includes(user && user.id)
    const hasCurrentUserVoted = userVotedOpOne || userVotedOpTwo
    const Vote = props.Vote

    console.log("OPTWO=>> ", optionTwo)
    const red = "#ff4d4f"
    const green = "#52c41a"

    let OptionOneColor = optionOneVotesPercent > optionTwoVotesPercent ? green : red
    let OptionTwoColor = OptionOneColor == red ? green : red

    const responsiveWidth = { minWidth: 200, maxWidth: 400, width: '100%' }
    const style={ ...responsiveWidth, display: 'inline-block', margin: 10, borderRadius: 10, textAlign: 'left', overflow: 'hidden', position: 'relative', paddingBottom: 10 }

    return (
        <Card {...props} style={style} author={author} child={
            hasCurrentUserVoted ?
                (<div>
                    <b>{optionOneText}&nbsp; {yourVote(userVotedOpOne)}</b>
                    <Progress percent={optionOneVotesPercent} strokeWidth={13} strokeLinecap="square" strokeColor={OptionOneColor} />
                    <p style={{ textAlign: 'center', margin: '15px auto', fontWeight: 'bold', color: 'white', textShadow: '0px 0px 3px black' }}>OR</p>
                    <b> {optionTwoText}&nbsp; {yourVote(userVotedOpTwo)} </b>
                    <Progress percent={optionTwoVotesPercent}  strokeWidth={13} strokeLinecap="square" strokeColor={OptionTwoColor} />
                </div>) : (
                    <div style={{ textAlign: 'center' }}>
                        <Tooltip title={optionOneText+ " ?"}>
                            <Button className="opBTN" style={{ background: OptionOneColor }} onClick={() => Vote(1)}  >{optionOneText}?</Button>
                        </Tooltip>
                        <Tooltip title={optionTwoText+" ?"}>
                            <Button className="opBTN" style={{ background: OptionTwoColor }} onClick={() => Vote(2)} >{optionTwoText}?</Button>
                        </Tooltip>


                    </div>)}


                />)
}

const yourVote = (show) => show ? <Tag style={{ borderRadius: 10 }} color="#2db7f5">YOUR VOTE</Tag> : null


export default Question
