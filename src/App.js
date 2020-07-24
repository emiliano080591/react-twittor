import React,{useState} from 'react';
import SignInSignUp from './pages/SignInSignUp';

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
    </div>
  )

}
