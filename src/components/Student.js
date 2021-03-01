import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { InputLabel,CssBaseline } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
      width: 528,
      marginTop: 50,
      marginLeft:289,
    },
    title: {
      fontSize: 14,
    },
  });

const Student=(props)=>{
    const [student,setStudent] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const dataArr = JSON.parse(localStorage.getItem("users") || "[]");
        dataArr.forEach((element,index)=> {
            if(dataArr[index].username === props.studentData.username)  setStudent(element);   
        });
    }, [props.studentData])

    return(
        <>
        <Typography variant="h4" align="center" component="h1" gutterBottom>
        Student Profile
        </Typography>
        <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          <InputLabel>username: </InputLabel>{student.username!=='' ? student.username: '-'}
          </Typography>
          <CssBaseline />
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          <InputLabel>Email: </InputLabel> {student.email!==''? student.email: '-'}
          </Typography>
          <CssBaseline />
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Physics,Chemistry,Maths
          </Typography>
          </CardContent>
      </Card>
        </>
    );
}
export default Student;