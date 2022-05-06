import React, {useContext, useEffect, useState} from "react";
import { API_URL, UserState } from "../App";
import {useNavigate} from "react-router-dom"
import { Card,
  CardContent,
  CardActionArea,
  Box,
  Grid, 
  Typography} from "@mui/material";

function MyPosts({selectPost}){
  const [allPosts, setAllPosts] = useState([])
  const {user, setUser} = useContext(UserState)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user === null){
      navigate("/SignIn")
    } else{
      getMyPosts()
    }
  },[user])

  const getMyPosts = function(){
    fetch(`${API_URL}/posts/user/`,{
      headers:{
        'Authorization': user
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error === "Invalid Token"){
        sessionStorage.removeItem("accessKey");
        setUser(null)
        navigate("/SignIn")
        alert("User Session Has Expired")
      }else{
        setAllPosts(data)
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }

  return(
    <Box sx={{flexGrow: 1}}>
      <Box display='flex' justifyContent='center' alignContent='center' margin={10}>
      <Grid container spacing={2} maxWidth='1000px'>
        <Grid item xs={12}>
          <Typography variant="h2">My Posts</Typography>
        </Grid>
        {allPosts.map((post, i)=>(
          <Grid key={i} item xs={6}>
            <Card>
              <CardActionArea sx={{minHeight:'105px'}} onClick={()=>{
                selectPost(post)
                navigate(`${post.id}`)
                }}>
                <CardContent>
                  <Typography variant="h4">
                    {post.title}
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

export default MyPosts