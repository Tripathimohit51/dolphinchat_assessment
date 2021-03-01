import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import LandingComp from './components/LandingComp';

function App() {
  const [userData, setuserData] = useState({});

  if (userData && Object.keys(userData).length !== 0) {
    return (
      <LandingComp loginData={userData} />
    );
  } else {
    return (
      <div className="App">
        <Login handleSubmit={(value) => { setuserData(value) }} />
     </div>
    );
  }
}

export default App;
