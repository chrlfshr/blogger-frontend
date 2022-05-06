import React, { useEffect } from "react";
import {Box, Grid, Typography,} from "@mui/material";
import { useNavigate } from "react-router-dom";

function SinglePost({post}){
  const navigate = useNavigate()

  useEffect(()=>{
    if(post.id === undefined){
      navigate('/')
    }
  },[])

  return(
    <Box display='flex' justifyContent='center' margin={10}>
      <Grid container spacing={2} maxWidth='800px'>
        <Grid item xs={12}>
          <Typography variant="h4">{post.title}</Typography>
        </Grid>
        <Grid textAlign='left' item xs={12}>
          <Typography variant="body">{post.content}</Typography>
        </Grid>
        <Grid item textAlign='left' xs={6}>
          <Typography variant="body">Created: {post.creation_date}</Typography>
        </Grid>
        <Grid item textAlign='right' xs={6}>
          <Typography variant="body">Author: {post.first_name} {post.last_name} </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SinglePost