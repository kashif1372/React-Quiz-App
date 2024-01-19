import React from 'react'
import { Route,Routes} from 'react-router-dom'
import Main from './components/Main'
import WelcomePage from './components/WelcomePage'



const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/main" element={<Main />} />
    </Routes>  
    </>
  )
}

export default AppRoutes;
