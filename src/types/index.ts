import { Dispatch, SetStateAction } from 'react'
import { Question } from '../data/QuizQuestions'

export enum ScreenTypes {
  QuizDetailsScreen,
  QuestionScreen,
  ResultScreen,
}

export interface Result extends Question {
  selectedAnswer: string[]
  isMatch: boolean
  score: number
}

// export type ApiQuestion = {
//   question: string
//   difficulty: string
//   correct_answer: string
//   incorrect_answers: string[]
//   score: number
// }

export type QuizContextTypes = {
  currentScreen: ScreenTypes
  setCurrentScreen: Dispatch<SetStateAction<ScreenTypes>>
  questions: any[]
  attemptedQuestions: Number[]
  markedForReview: Number[]
  setAttemptedQuestions: Dispatch<SetStateAction<any>>
  setQuestions: Dispatch<SetStateAction<any[]>>
  result: Result[]
  setResult: Dispatch<SetStateAction<any[]>>
  timer: number
  isChecked: boolean
  setTimer: Dispatch<SetStateAction<number>>
  handleQuestionClick: Dispatch<SetStateAction<any>>
  handleMarkForReview: Dispatch<SetStateAction<any>>
  endTime: number
  activeQuestion:number
  setActiveQuestion: Dispatch<SetStateAction<any>>
  setEndTime: (type: number) => void
  quizDetails: {
    totalQuestions: number
    totalScore: number
    totalTime: number
    selectedQuizTopic: string
  }
}
