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

function SinglePost({post}){

  return(
    <Box sx={{flexGrow: 1}}>
      <Typography variant="h2">
        {post.title}
      </Typography>
      <Typography variant="h5">
        Author: {post.first_name} {post.last_name} 
      </Typography>
      <Typography variant="h6">
        Created: {post.creation_date}
      </Typography>
      <Typography variant="body">
        {post.content}
      </Typography>
    </Box>
  )
}

export default SinglePost