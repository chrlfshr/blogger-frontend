import React from "react";
import {Box, Grid, Typography,} from "@mui/material";

function SinglePost({post}){

  return(
    <Box display='flex' justifyContent='center' margin={2}>
      <Grid container spacing={2} maxWidth='800px'>
        <Grid item xs={12}>
          <Typography variant="h2">{post.title}</Typography>
        </Grid>
        {(post.first_name !== undefined || post.last_name !== undefined) && <Grid item xs={12}>
          <Typography variant="h5">Author: {post.first_name} {post.last_name} </Typography>
        </Grid>}
        <Grid textAlign='left' item xs={12}>
          <Typography variant="body">{post.content}</Typography>
        </Grid>
        <Grid item textAlign='left' xs={12}>
          <Typography variant="body">Created: {post.creation_date}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SinglePost