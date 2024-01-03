import React from 'react';
import './App.css';
import Registration from './components/Registration/Registration';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import MainPage from './components/MainPage/MainPage';
import { useUser } from './context/UserContext';
import ChatPage from './components/ChatPage/ChatPage';

function App() {

  const {user} = useUser() 
  console.log(user)

  return (
    <div className="App">
    <Routes>
      {user ? (<><Route path='/chat' element={<ChatPage/>}/> <Route path='/chat/:chatID' element={<ChatPage/>}/> <Route path='*' element={<Navigate to={"/chat"} />}/></>):
      (<> <Route path="/" element={<MainPage/>}/>
      <Route path="/signUp" element={<Registration/>}/>
      <Route path="/signIn" element={<Login/>}/>
      <Route path='*' element={<Navigate to={"/"} />}/>
      </>)}
    </Routes>
    </div>
  );
}

export default App;
