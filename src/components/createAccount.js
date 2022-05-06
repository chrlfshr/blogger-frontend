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

function CreateAccount(){
  const [newAccount, setNewAccount] = useState({
    first_name: '',
    last_name: '',
    username:'',
    password:''
  })
  const [usernameError, setUsernameError] = useState(false)
  const navigate = useNavigate()

  const createAccount = function(){
    fetch(`${API_URL}/users`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAccount)
    })
    .then(res => {
      if(res.status === 400){
        console.log('username error')
        setUsernameError(true)
      } else{
        navigate("/SignIn")
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }

  return(<Box display='flex' justifyContent='center' margin={10}>
    <Grid container spacing={2} width="500px">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom >
          Create an Account
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField variant="outlined" label='First Name' 
        onChange={(e)=> setNewAccount({...newAccount, first_name: e.target.value})}/>
      </Grid>
      <Grid item xs={6}>
        <TextField variant="outlined" label='Last Name' 
        onChange={(e)=> setNewAccount({...newAccount, last_name: e.target.value})}/>
      </Grid>
      <Grid item xs={12}>
        <TextField variant="outlined" label='Username' fullWidth
        onChange={(e)=> setNewAccount({...newAccount, username: e.target.value})}/>
      </Grid>
      <Grid item xs={12}>
        <TextField variant="outlined" type="password" label='Password' fullWidth
        helperText="Password must be at least 8 characters long"
        onChange={(e)=> setNewAccount({...newAccount, password: e.target.value})}/>
      </Grid>
      {usernameError && 
      <Grid item xs={12}>
        <Typography variant="button" gutterBottom color="error">Error: Username already taken</Typography>
      </Grid>}
      <Grid item xs={12}>
        <Button variant='outlined' onClick={createAccount}>Submit</Button>
      </Grid>
    </Grid>
    
  </Box>)

}

export default CreateAccount