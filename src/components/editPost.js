import React, {useContext, useEffect, useState} from "react";
import { API_URL, PostUpdate } from "../App";
import {Routes, Route, useNavigate} from "react-router-dom"
import { Grid,
  Box,
  Typography, 
  Button, 
  TextField} from "@mui/material";

function EditPost({post}){
  const navigate = useNavigate()
  const [postData, setPostData] = useState(post)
  const getPosts = useContext(PostUpdate)

  const patchPost = function(){
    fetch(`${API_URL}/posts/${post.id}`, {
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(res => {
      console.log(res)
      getPosts()
      // getMyPosts()
      navigate('/MyPosts')
    })
    .catch(err =>{
      console.log(err)
    })
  }
  
  const deletePost = function(){
    fetch(`${API_URL}/posts/${post.id}`, {
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(res => {
      console.log(res)
      getPosts()
      // getMyPosts()
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
          Edit Post
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" label='Title' value={postData.title}
          onChange={(e)=> setPostData({...postData, title: e.target.value})}/>
        </Grid>
        <Grid item xs={12}>
          <TextField multiline={true} rows={6} variant="outlined" label='Content' fullWidth value={postData.content}
          onChange={(e)=> setPostData({...postData, content: e.target.value})}/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Created: {post.creation_date}
          </Typography>
        </Grid>
        <Grid item xs={3}/>
        <Grid item xs={3}>
          <Button variant='outlined' onClick={patchPost}>Update Post</Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='outlined' color="error" onClick={deletePost}>Delete Post</Button>
        </Grid>
        <Grid item xs={3}/>
      </Grid> 
    </Box>
  )
}

export default EditPost