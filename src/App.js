import React,{useState} from 'react';
import SignInSignUp from './pages/SignInSignUp';
import {ToastContainer} from 'react-toastify';

export default function App() {
  const [user,setUser]=useState({name:"Emiliano"});
  return(
    <div>
      {user ? (
        <div>
          <SignInSignUp/>
        </div>
      ) : (
        <h1>No estas logeado</h1>)}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
    </div>
  )

}
