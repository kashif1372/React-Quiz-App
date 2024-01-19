import { ThemeProvider } from 'styled-components'

import QuizProvider from './context/QuizContext'
import { GlobalStyles } from './styles/Global'
import { theme as AppTheme } from './styles/Theme'
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './Routes'


const App = () => (
  <Router>
  <ThemeProvider theme={AppTheme}>
    <GlobalStyles />
    <QuizProvider>
    <AppRoutes/>  
    </QuizProvider>
  </ThemeProvider>
  </Router>
)

export default App
