import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { QuizContextTypes, Result, ScreenTypes } from '../types'
import axios from "axios";



const initialState: QuizContextTypes = {
  currentScreen: ScreenTypes.QuizDetailsScreen,
  setCurrentScreen: () => {},
  questions: [],
  setQuestions: () => {},
  attemptedQuestions: [],
  markedForReview: [],
  setAttemptedQuestions: () => {},
  result: [],
  setResult: () => {},
  timer: 15,
  setTimer: () => {},
  endTime: 0,
  setEndTime: () => {}, 
  handleQuestionClick: () => {},
  handleMarkForReview: () => {},
  activeQuestion:0,
  isChecked: false,
  setActiveQuestion: () => {},
  quizDetails: {
    totalQuestions: 0,
    totalScore: 0,
    totalTime: 0,
    selectedQuizTopic: 'React',
  },
}

export const QuizContext = createContext<QuizContextTypes>(initialState)

export function useQuiz() {
  return useContext(QuizContext)
}

type QuizProviderProps = {
  children: ReactNode
}

const QuizProvider = ({ children }: QuizProviderProps) => {
  const [timer, setTimer] = useState<number>(initialState.timer)
  const [endTime, setEndTime] = useState<number>(initialState.endTime)
  const [result, setResult] = useState<Result[]>(initialState.result)
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [currentScreen, setCurrentScreen] = useState<ScreenTypes>(
    initialState.currentScreen
  )

  const [questions, setQuestions] = useState<any[]>([])
  const [attemptedQuestions, setAttemptedQuestions] = useState<number[]>([])
  const [markedForReview, setMarkedForReview] = useState<number[]>([])
  const [isChecked, setIsChecked] = useState<boolean>(false);

  function shuffleArray(array:string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      const temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  const fetchQuestionsFromAPI = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=15'); 
      const {results} = response.data;
      const quesArray = results.map((ques:any) => {
        const {incorrect_answers, correct_answer, type, question} = ques;
        const choicesAppended = [...incorrect_answers, correct_answer];
        const choices = shuffleArray(choicesAppended);
        const correctAnswers = [correct_answer];
        return { question, type, choices, correctAnswers, score:5}
      })
      const rst =  quesArray.map((currQues:any) => {
        return {
          marked:false,
          ...currQues,
          selectedAnswer:[],
          isMatch:false,
        }
      });
      setResult(rst);
      setQuestions(quesArray);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

 
     
  const handleMarkForReview = (activeQuestion:number) => {
       setIsChecked(!isChecked); 
        if(!markedForReview.includes(activeQuestion)){
          setMarkedForReview([...markedForReview,activeQuestion]);
        }
        else{
          const filterArray = markedForReview.filter((ele:number)=> ele!==activeQuestion);
          setMarkedForReview(filterArray);
        }
  }


    const handleQuestionClick = (index:number) => {

      console.log("clicked");
        setActiveQuestion(index);
  };

  const QuizInfo = {
  topic: 'Quiz',
  level: 'Intermediate',
  totalQuestions: 15,
  totalScore: 75,
  totalTime: 1800,
  questions: [],
  }
  
  const {totalTime, totalQuestions, totalScore} = QuizInfo;

  useEffect(() => {
    setTimer(totalTime)
    fetchQuestionsFromAPI()
  }, [])

  

  const quizDetails = {
    totalQuestions,
    totalScore,
    totalTime,
    selectedQuizTopic:'GK'
  }

  const quizContextValue: QuizContextTypes = {
    currentScreen,
    setCurrentScreen,
    questions,
    setQuestions,
    result,
    setResult,
    quizDetails,
    timer,
    setTimer,
    endTime,
    setEndTime,
    handleQuestionClick,
    activeQuestion,
    setActiveQuestion,
    attemptedQuestions,
    markedForReview,
    setAttemptedQuestions,
    handleMarkForReview,
    isChecked
  }

  return <QuizContext.Provider value={quizContextValue}>{children}</QuizContext.Provider>
}

export default QuizProvider;
