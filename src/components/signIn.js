import React, {useState} from "react";
import { API_URL} from "../App";
import {useNavigate} from "react-router-dom"
import {
  Box,
  Grid, 
  Typography, 
  Button,
  TextField
  } from "@mui/material";

function SignIn({setUser}){
  const [signIn, setSignIn] = useState({
    username:'',
    password:''
  })

  const [signInError, setSignInError] = useState(false)
  const navigate = useNavigate()

  const checkSignIn = function(){
    fetch(`${API_URL}/users/login`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signIn)
    })
    .then(res => res.json())
    .then(data =>{
      if(data.message !== "failed to sign in"){
        setUser(data)
        sessionStorage.setItem("accessKey", data)
        navigate('/MyPosts')
      } else{
        setSignInError(true)
      }
    })
    .catch(err =>{
      console.log(err)
      setSignInError(true)
    })
  }

  return(<Box display='flex' justifyContent='center' margin={10}>
    <Grid container spacing={2} width="500px">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom >
          Sign In
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField variant="outlined" label='Username' fullWidth
        onChange={(e)=> setSignIn({...signIn, username: e.target.value})}/>
      </Grid>
      <Grid item xs={12}>
        <TextField variant="outlined" type="password" label='Password' fullWidth
        onChange={(e)=> setSignIn({...signIn, password: e.target.value})}/>
      </Grid>
      {signInError && 
      <Grid item xs={12}>
        <Typography variant="button" gutterBottom color="error">Error: Invalid Username or Password</Typography>
      </Grid>}
      <Grid item xs={12}>
        <Button variant='contained' onClick={checkSignIn}>Sign In</Button>
      </Grid>
    </Grid>
    
  </Box>)

}

export default SignIn