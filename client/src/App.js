import './App.css';
import React, {useState, useEffect} from 'react';
import Sitebar from './home/Sitebar';
import Auth from './home/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {

  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])


  const protectViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken}/>
    : <Auth updateToken={updateToken}/>)
  }

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken)
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  return (
    <div className='bigWrappe'>
      <Sitebar clickLogout={clearToken}/>
      {protectViews()}
      </div>
  );
}

export default App;
