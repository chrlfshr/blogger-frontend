import React, {useContext, useEffect, useState} from "react";
import { PostContext } from "../App";
import {Routes, Route, useNavigate} from "react-router-dom"
import { Grid,
  Box,
  Typography, 
  Button, 
  IconButton,
  TextField} from "@mui/material";

function EditPost({post}){

  const [postData, setPostData] = useState(post)

  const patchPost = function(){

  }
  
  const deletePost = function(){
    
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
        <TextField multiline={true} rows={6} variant="outlined" label='content' fullWidth value={postData.content}
        onChange={(e)=> setPostData({...postData, content: e.target.value})}/>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Created: {post.creation_date}
        </Typography>
      </Grid>
      <Grid item xs={3}>

      </Grid>
      <Grid item xs={3}>
        <Button variant='outlined' onClick={patchPost}>Update Post</Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant='outlined' color="error" onClick={deletePost}>Delete Post</Button>
      </Grid>
      <Grid item xs={3}>

      </Grid>
      
    </Grid> 
    </Box>
  )
}

export default EditPost