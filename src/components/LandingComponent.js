import React from 'react';
import Teacher from './Teacher';
import Student from './Student';
 
const LandingComponent=(props) => {

    if (props.loginData.userType ==='teacher') {
        return (
          <Teacher />
        );
      } else {
        return (
        <Student studentData = {props.loginData}/>
        );
      }
}

export default LandingComponent;