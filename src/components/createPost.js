import React, {useContext, useEffect, useState} from "react";
import { API_URL, UserState, PostUpdate } from "../App";
import {Routes, Route, useNavigate} from "react-router-dom"
import { Grid,
  Box,
  Typography, 
  Button, 
  TextField} from "@mui/material";

function CreatePost(){
  const navigate = useNavigate()
  const user = useContext(UserState)
  const getPosts = useContext(PostUpdate)
  const [postData, setPostData] = useState({
    user_id: user.id,
  })

  useEffect(()=>{
    if(user.id === undefined){
      navigate("/SignIn")
    }
  },[])

  const postPost = function(){
    const date =  new Date
    fetch(`${API_URL}/posts`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...postData, creation_date: date})
    })
    .then(res => {
      console.log(res)
      getPosts()
      navigate("/MyPosts")
    })
    .catch(err =>{
      console.log(err)
    })
  }
  

  return(
    <Box display='flex' justifyContent='center' margin={10}>
      <Grid container spacing={2} width="800px">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom >
         Create Post
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField variant="outlined" label='Title' value={postData.title} fullWidth
        onChange={(e)=> setPostData({...postData, title: e.target.value})}/>
      </Grid>
      <Grid item xs={12}>
        <TextField multiline={true} rows={6} variant="outlined" label='Content' fullWidth value={postData.content}
        onChange={(e)=> setPostData({...postData, content: e.target.value})}/>
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' onClick={postPost}>Create Post</Button>
      </Grid>
    </Grid> 
    </Box>
  )
}

export default CreatePost