import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import LandingComponent from './components/LandingComponent';

function App() {
  const [userData, setuserData] = useState({});

  if (userData && Object.keys(userData).length !== 0) {
    return (
      <LandingComponent loginData={userData} />
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
