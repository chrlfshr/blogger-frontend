import React, {useContext, useEffect, useState} from "react";
import { PostContext } from "../App";
import {Routes, Route, useNavigate} from "react-router-dom"
import { Card,
  CardContent,
  CardActionArea,
  Box,
  Grid,  
  Typography} from "@mui/material";
import SinglePost from "./singlePost";

function PostList({selectPost}){
  const allPosts = useContext(PostContext)
  const navigate = useNavigate()

  console.log(allPosts)

  return(
    <Box sx={{flexGrow: 1}}>
      {/* <Routes>
      <Route path="/:postId" element = {<SinglePost post = {selectedPost}/>}/>
      </Routes> */}
      <Box display='flex' justifyContent='center' alignContent='center' margin={10}>
      <Grid container spacing={2} maxWidth='1000px'>
        <Grid item xs={12}>
        <Typography variant="h2">All Posts</Typography>
        </Grid>
        {allPosts.map((post)=>(
          <Grid item xs={6}>
            <Card>
              <CardActionArea sx={{minHeight:'153px'}} onClick={()=>{
                selectPost(post)
                navigate(`${post.id}`)
                }}>
                <CardContent>
                  <Typography variant="h4">
                    {post.title}
                  </Typography>
                  <Typography variant="h6">
                    Author: {post.first_name} {post.last_name}
                  </Typography>
                  <Typography variant="body">
                    {post.content.slice(0,100)}{post.content.length > 100 ? '...' : ""}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>
    </Box>
  )
}

export default PostList