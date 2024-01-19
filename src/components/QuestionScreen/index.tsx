import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { CheckIcon, Next, TimerIcon } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { useTimer } from '../../hooks'
import { device } from '../../styles/BreakPoints'
import { ScreenTypes } from '../../types'

import Button from '../ui/Button'
import ModalWrapper from '../ui/ModalWrapper'
import Question from './Question'
import QuizHeader from './QuizHeader'
import QuizWrapper from '../QuestionMainScreen'


const QuizContainer = styled.div<{ selectedAnswer: boolean }>`
  width: 900px;
  min-height: 500px;
  height:100%;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  padding: 30px 60px 80px 60px;
  margin-bottom: 70px;
  position: relative;
  @media ${device.md} {
    width: 100%;
    padding: 15px 15px 80px 15px;
  }
  button {
    span {
      svg {
        path {
          fill: ${({ selectedAnswer, theme }) =>
            selectedAnswer ? `${theme.colors.white}` : `${theme.colors.darkGrayText}`};
        }
      }
    }
  }
  `

const QuestionScreen: FC = () => {
 
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false)
  const [showResultModal, setShowResultModal] = useState<boolean>(false)

  const {
    questions,
    // setQuestions,
    quizDetails,
    result,
    setCurrentScreen,
    timer,
    setTimer,
    setEndTime,
    activeQuestion,
    setActiveQuestion,
    attemptedQuestions,
    setAttemptedQuestions,
    handleMarkForReview,
    markedForReview,
  } = useQuiz()

  const currentQuestion = questions[activeQuestion];
  

  const { question, type, choices, correctAnswers } = currentQuestion

  
 

  const onClickNext = () => {
    const isMatch: boolean =
      selectedAnswer.length === correctAnswers.length &&
      selectedAnswer.every((answer) => correctAnswers.includes(answer))

      

    const idx = result.findIndex(resultObj => resultObj.question === currentQuestion.question);
    if(selectedAnswer.length>0){
      result[idx] = { ...currentQuestion, selectedAnswer, isMatch ,marked:true };
    }
    if(!attemptedQuestions.includes(activeQuestion)){
      setAttemptedQuestions([...attemptedQuestions,activeQuestion])
    }


    if (activeQuestion !== questions.length-1) {
      setActiveQuestion((prev:number) => prev + 1)
    } else {
      // how long does it take to finish the quiz
      const timeTaken = quizDetails.totalTime - timer
      setEndTime(timeTaken)
      setShowResultModal(true)
    }
    setSelectedAnswer([])
  }

  const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    if (type === 'multiple' || type === 'boolean') {
      if (checked) {
        setSelectedAnswer([name]);
      }
    }
  }

  const textVal = markedForReview.includes(activeQuestion)?"Unmark":"Mark";


  const handleModal = () => {
    setCurrentScreen(ScreenTypes.ResultScreen)
    document.body.style.overflow = 'auto'
  }

  // to prevent scrolling when modal is opened
  useEffect(() => {
    if (showTimerModal || showResultModal) {
      document.body.style.overflow = 'hidden'
    }
  }, [showTimerModal, showResultModal])

  // timer hooks, handle conditions related to time
  useTimer(timer, quizDetails, setEndTime, setTimer, setShowTimerModal, showResultModal)

  return (
    // <PageCenter>
      <QuizWrapper>
      <QuizContainer selectedAnswer={selectedAnswer.length > 0}>
        <QuizHeader
          activeQuestion={activeQuestion}
          totalQuestions={quizDetails.totalQuestions}
          timer={timer}
        />
        <Question
          question={question}
          choices={choices}
          type={type}
          handleAnswerSelection={handleAnswerSelection}
          selectedAnswer={selectedAnswer}
        />
       
        
        <div className="flex items-center gap-4 mb-4">
        <Button
            text={activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            onClick={onClickNext}
            icon={<Next />}
            iconPosition="left"
            disabled={selectedAnswer.length === 0}
          />
        <button onClick={() => handleMarkForReview(activeQuestion)} className={`${markedForReview.includes(activeQuestion)?"bg-gray-400 hover:bg-gray-600":"bg-blue-500 hover:bg-blue-700"}  text-white font-bold py-2 px-6 rounded`}>
         {textVal}
       </button>
       </div>
      </QuizContainer>
      {/* timer or finish quiz modal*/}
      {(showTimerModal || showResultModal) && (
        <ModalWrapper
        title={showResultModal ? 'Done!' : 'Your time is up!'}
        subtitle={`You have attempted ${attemptedQuestions.length} questions in total.`}
        onClick={handleModal}
        icon={showResultModal ? <CheckIcon /> : <TimerIcon />}
        buttonTitle="SHOW RESULT"
        />
        )}
        </QuizWrapper>
    

  )
}

export default QuestionScreen;
