import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const WelcomePage = () => {
    const [email, setEmail] = useState('');
    const [emailList, setEmailList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const storedEmails = localStorage.getItem('emails');
        if (storedEmails) {
          setEmailList(JSON.parse(storedEmails));
        }
      }, []);

      const handleEmailSubmit = () => {
        if (email.trim() !== '') {
          // Add the new email to the list
          const updatedEmailList = [...emailList, email];
          setEmailList(updatedEmailList);
    
          // Store the updated email list in local storage
          localStorage.setItem('emails', JSON.stringify(updatedEmailList));
    
          // Clear the input field
          setEmail('');
          navigate('/main');

        }
      };
    
    
  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
            style={{
              minHeight: "100vh"
            }}>
          <div className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
              }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                  <div className="pr-12">
                    <h1 className="text-white font-semibold text-5xl">
                    Welcome to the QuizMaster App!
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                    Are you ready to test your knowledge?<br/> Challenge yourself with our quiz. Whether you're a trivia enthusiast or just looking to learn something new, try the quiz.
                    How it works:
                    <br/>
                    Enter your email address here and enter the application
                    <br/>
                    Answer the questions to the best of your knowledge.
                    </p>
                  </div>
                  <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <input
                   type="email"
                   placeholder="name@email.com"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="shadow appearance-none border rounded w-[1/2] py-2 px-3 m-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   required/>
                     <div  className="flex m-2 items-center justify-center">
                      <button
                       onClick={handleEmailSubmit}
                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                       >
                       Submit
                      </button> 
                  
                  </div>
                </div>

              </div>
          </div>
          </div>
          </div>
 )
}

export default WelcomePage;
