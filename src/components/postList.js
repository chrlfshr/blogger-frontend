import React, {useContext} from "react";
import { PostContext } from "../App";
import {useNavigate} from "react-router-dom"
import { Card,
  CardContent,
  CardActionArea,
  Box,
  Grid,  
  Typography} from "@mui/material";

function PostList({selectPost}){
  const allPosts = useContext(PostContext)
  const navigate = useNavigate()

  return(
    <Box sx={{flexGrow: 1}}>
      <Box display='flex' justifyContent='center' alignContent='center' margin={10}>
      <Grid container spacing={2} maxWidth='1000px'>
        <Grid item xs={12}>
        <Typography variant="h2">All Posts</Typography>
        </Grid>
        {allPosts.map((post, i)=>(
          <Grid key={i} item xs={6}>
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
                  <Typography variant="body2">
                    Created: {post.creation_date}
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