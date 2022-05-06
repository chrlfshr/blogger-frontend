import React, {useContext, useEffect, useState} from "react";
import { API_URL, UserState, PostUpdate } from "../App";
import {useNavigate} from "react-router-dom"
import { Grid,
  Box,
  Typography, 
  Button, 
  TextField} from "@mui/material";

function CreatePost(){
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserState)
  const getPosts = useContext(PostUpdate)
  const [postData, setPostData] = useState({
    title: "",
    content: ""
  })

  useEffect(()=>{
    if(user === null){
      navigate("/SignIn")
    }
  },[user])

  const postPost = function(){
    const date = Date()
    fetch(`${API_URL}/posts`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': user
      },
      body: JSON.stringify({...postData, creation_date: date.slice(0, date.indexOf("("))})
    })
    .then(res => res.json())
    .then(data => {
      if(data.error === "Invalid Token"){
        sessionStorage.removeItem("accessKey");
        setUser(null)
        navigate("/SignIn")
        alert("User Session Has Expired")
      }else{
        getPosts()
        navigate("/MyPosts")
      }
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