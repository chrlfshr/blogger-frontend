import React, {useContext, useState} from "react";
import { API_URL, PostUpdate, UserState } from "../App";
import {useNavigate} from "react-router-dom"
import { Grid,
  Box,
  Typography, 
  Button, 
  TextField} from "@mui/material";

function EditPost({post}){
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserState)
  const [postData, setPostData] = useState(post)
  const getPosts = useContext(PostUpdate)

  const patchPost = function(){
    fetch(`${API_URL}/posts`, {
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': user
      },
      body: JSON.stringify({id: postData.id, title: postData.title, content: postData.content})
    })
    .then(res => res.json())
    .then(data => {
      if(data.error === "Invalid Token"){
        setUser(undefined)
        navigate("/SignIn")
      }
      getPosts()
      navigate('/MyPosts')
    })
    .catch(err =>{
      console.log(err)
    })
  }
  
  const deletePost = function(){
    fetch(`${API_URL}/posts`, {
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': user
      },
      body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(data => {
      if(data.error === "Invalid Token"){
        setUser(undefined)
        navigate("/SignIn")
      }
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
        {/* <Grid item xs={12}>
          <Typography variant="h4" gutterBottom >
          Edit Post
          </Typography>
        </Grid> */}
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <TextField variant="outlined" label='Title' fullWidth value={postData.title}
          onChange={(e)=> setPostData({...postData, title: e.target.value})}/>
        </Grid>
        <Grid item xs={3}/>
        <Grid item xs={12}>
          <TextField multiline={true} rows={6} variant="outlined" label='Content' fullWidth value={postData.content}
          onChange={(e)=> setPostData({...postData, content: e.target.value})}/>
        </Grid>
        <Grid item textAlign='left' xs={6}>
          <Typography variant="body">Created: {post.creation_date}</Typography>
        </Grid>
        <Grid item textAlign='right' xs={6}>
          <Typography variant="body">Author: {post.first_name} {post.last_name} </Typography>
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