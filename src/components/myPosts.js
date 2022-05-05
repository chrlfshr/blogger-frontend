import React, {useContext, useEffect, useState} from "react";
import { API_URL, UserState } from "../App";
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
import EditPost from "./editPost";

function MyPosts(){
  const [allPosts, setAllPosts] = useState([])
  const [selectedPost, selectPost] = useState({});
  const user = useContext(UserState)
  const navigate = useNavigate()

  useEffect(()=>{
    console.log(user)
    if(user.username === undefined){
      navigate("/SignIn")
    }
    getMyPosts()
  },[])

  const getMyPosts = function(){
    fetch(`${API_URL}/posts/${user.id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setAllPosts(data)})
  }


  return(
    <Box sx={{flexGrow: 1}}>
      <Routes>
      <Route path="/:postId" element = {<div>
        <SinglePost post = {selectedPost}/>
        <Button variant="outlined" onClick={() => navigate(`${selectedPost.id}/edit`)}>Edit Post</Button>
        </div>}/>
      <Route path="/:postId/edit" element = {<EditPost post = {selectedPost}/>}/>
      </Routes>
      <Typography variant="h2">My Posts</Typography>
      <Grid container spacing={2} maxWidth='1000px'>
        {allPosts.map((post)=>(
          <Grid item xs={6}>
            <Card>
              <CardActionArea onClick={()=>{
                selectPost(post)
                navigate(`${post.id}`)
                }}>
                <CardContent>
                  <Typography variant="h4">
                    {post.title}
                  </Typography>
                  <Typography variant="h6">
                    Author: {user.first_name} {user.last_name}
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

export default MyPosts