import React, {useContext, useEffect, useState} from "react";
import { PostContext } from "../App";
import {Routes, Route, useNavigate} from "react-router-dom"
import { Card,
  CardContent,
  CardActionArea,
  Box,
  Grid, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton} from "@mui/material";
import SinglePost from "./singlePost";

function PostList(){
  const [selectedPost, selectPost] = useState({});
  const allPosts = useContext(PostContext)
  const navigate = useNavigate()


  console.log(allPosts)

  return(
    <Box sx={{flexGrow: 1}}>
      <Routes>
      <Route path="/:postId" element = {<SinglePost post = {selectedPost}/>}/>
      </Routes>
      <Typography variant="h2">All Posts</Typography>
      <Grid container spacing={2} maxWidth='1000px'>
        {allPosts.map((post)=>(
          <Grid item xs={6}>
            <Card>
              <CardActionArea onClick={()=>{
                console.log("HERE")
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
                    {post.content.slice(0,100)}...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default PostList