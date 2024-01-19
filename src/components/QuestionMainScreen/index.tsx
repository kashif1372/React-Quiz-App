import React, { ReactNode } from 'react';
import QuestionOverviewPanel from '../OverviewPanel';

interface QuizWrapperProps {
    children: ReactNode;
  }
  
  const QuizWrapper: React.FC<QuizWrapperProps> = ({ children }) => {
    return (
      <div className="flex bg-white fixed">
        <div className="md:w-70p w-full fixed left-0 top-0 overflow-y-auto">{children}</div>
        <div className="w-30p h-full hidden md:block fixed right-0 top-0 bg-white p-4 shadow-lg">
         <QuestionOverviewPanel/>
        </div>
      </div>
    );
  };

export default QuizWrapper;
