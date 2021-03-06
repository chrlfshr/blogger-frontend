import React, {useContext} from "react";
import {useNavigate} from "react-router-dom"
import {UserState } from "../App";
import { AppBar,
   Box, 
   Toolbar, 
   Typography, 
   Button} from "@mui/material";

function AppHeader(){
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserState) 

  return(
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h4" component="div" sx={{flexGrow: 1, textAlign: 'left'}}>Gabble: Get Your Thoughts Out</Typography>
          <Button color="inherit" onClick={()=> navigate("/")}>All Posts</Button>
          {user !== null && <Button color="inherit" onClick={()=> navigate("/MyPosts")}>My Posts</Button>}
          {user !== null && <Button color="inherit" onClick={()=> navigate("/CreatePost")}>New Post</Button>}
          {user !== null && <Button color="inherit" onClick={()=> {
            sessionStorage.removeItem("accessKey");
            setUser(null)
            navigate("/")
            }}>Logout</Button>}
          {user === null && <Button color="inherit" onClick={()=> navigate("/SignIn")}>Login</Button>}
          {user === null && <Button color="inherit" onClick={()=> navigate("/CreateAccount")}>Create Account</Button>}
          
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default AppHeader