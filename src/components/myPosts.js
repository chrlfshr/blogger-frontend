import React, {useContext, useEffect, useState} from "react";
import { API_URL, UserState } from "../App";
import {Routes, Route, useNavigate} from "react-router-dom"
import { Card,
  CardContent,
  CardActionArea,
  Box,
  Grid, 
  Typography, 
  Button} from "@mui/material";
import SinglePost from "./singlePost";
import EditPost from "./editPost";

function MyPosts({selectPost}){
  const [allPosts, setAllPosts] = useState([])
  const user = useContext(UserState)
  const navigate = useNavigate()

  useEffect(()=>{
    console.log(user)
    if(user.username === undefined){
      navigate("/SignIn")
    } else{
      getMyPosts()
    }
  },[])

  const getMyPosts = function(){
    console.log(user.id)
    fetch(`${API_URL}/posts/user/${user.id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setAllPosts(data)})
    .catch(err =>{
      console.log(err)
    })
  }

  return(
    <Box sx={{flexGrow: 1}}>
      <Routes>
      {/* <Route path="/:postId" element = {<div>
        <SinglePost post = {selectedPost}/>
        <Button variant="outlined" onClick={() => navigate(`${selectedPost.id}/edit`)}>Edit Post</Button>
        </div>}/> */}
      
      </Routes>
      <Box display='flex' justifyContent='center' alignContent='center' margin={10}>
      <Grid container spacing={2} maxWidth='1000px'>
        <Grid item xs={12}>
          <Typography variant="h2">My Posts</Typography>
        </Grid>
        {allPosts.map((post)=>(
          <Grid item xs={6}>
            <Card >
              <CardActionArea sx={{minHeight:'105px'}} onClick={()=>{
                selectPost(post)
                navigate(`${post.id}`)
                }}>
                <CardContent>
                  <Typography variant="h4">
                    {post.title}
                  </Typography>
                  <Typography variant="body">
                    {post.content.slice(0,100)} {post.content.length > 100 ? '...' : ""}
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

export default MyPosts