import { FC } from 'react'

import styled, { css } from 'styled-components'
import { device } from '../../../styles/BreakPoints'
import { useQuiz } from '../../../context/QuizContext'


const AnswerStyle = styled.div<{ highlightAnswer: boolean, markedAns: boolean }>`
  font-size: clamp(18px, 4vw, 16px);
  color: ${({ theme }) => theme.colors.secondaryText};
  font-weight: 400;
  border: 1px solid
    ${({ highlightAnswer, theme }) =>
      highlightAnswer ? `${theme.colors.themeColor}` : `${theme.colors.lightGray}`};
  background-color: ${({ highlightAnswer, theme }) =>
    highlightAnswer ? `${theme.colors.lightPink}` : `${theme.colors.white}`};
  border-radius: 16px;
  margin-top: clamp(13px, calc(10px + 6 * ((100vw - 600px) / 1320)), 16px);
  cursor: pointer;
  ${({ highlightAnswer }) =>
    highlightAnswer &&
    css`
      transition: border 0.2s ease-in;
    `}
  @media ${device.md} {
    font-weight: 500;
  }
  input {
    visibility: hidden;
    margin: 0;
  }

  ${({ markedAns, theme }) =>
  markedAns ? `${theme.colors.themeColor}` : `${theme.colors.lightGray}`};
background-color: ${({ markedAns, theme }) =>
markedAns ? `${theme.colors.disabledButton}` : `${theme.colors.white}`};
border-radius: 16px;
margin-top: clamp(13px, calc(10px + 6 * ((100vw - 600px) / 1320)), 16px);
cursor: pointer;
${({ markedAns }) =>
markedAns &&
css`
  transition: border 0.2s ease-in;
`}
@media ${device.md} {
font-weight: 500;
}
input {
visibility: hidden;
margin: 0;
}
`

const AnswerLabel = styled.label`
  padding: 16px;
  display: flex;
  cursor: pointer;
  @media ${device.md} {
    padding: 14px;
  }
`

const ChoiceLabel = styled.span``

interface AnswerProps {
  index: number
  choice: string
  type: string
  selectedAnswer: string[]
  question: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Answer: FC<AnswerProps> = ({ onChange, index, choice, type, selectedAnswer, question}) => {
  // Convert index to alphabet character to show ABCD before question
  const label = String.fromCharCode(65 + index)
  const {result} = useQuiz();
  const idx = result.findIndex(resultObj => resultObj.question===question)
  const currentAns = result[idx];
  
 
  return (
    <AnswerStyle key={index} markedAns={currentAns.selectedAnswer.includes(choice)} highlightAnswer={selectedAnswer.includes(choice)}>
      <AnswerLabel>
        <ChoiceLabel>{label}.</ChoiceLabel>
        <input
          name={choice}
          // radio is for checked one option and checkbox is for checked multiple options
          type={type === 'MAQs' ? 'checkbox' : 'radio'}
          checked={selectedAnswer.includes(choice)}
          onChange={onChange}
          
        />
        {choice}
        
      </AnswerLabel>
    </AnswerStyle>
  )
}

export default Answer
