import React from "react";
import {useNavigate} from "react-router-dom"
import { AppBar,
   Box, 
   Toolbar, 
   Typography, 
   Button} from "@mui/material";

function AppHeader(){
  const navigate = useNavigate() 

  return(
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
      <Typography variant="h4" component="div" sx={{flexGrow: 1}}>Squaker</Typography>
        <Toolbar>

          <Button color="inherit" onClick={()=> navigate("/")}>All Posts</Button>
          <Button color="inherit" onClick={()=> navigate("/MyPosts")}>My Posts</Button>
          <Button color="inherit" onClick={()=> navigate("/CreatePost")}>New Post</Button>
          
          <Button color="inherit" onClick={()=> navigate("/SignIn")}>Login</Button>
          <Button color="inherit" onClick={()=> navigate("/CreateAccount")}>Create Account</Button>
          
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default AppHeader