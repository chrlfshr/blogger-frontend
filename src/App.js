
import './App.css';
import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate } from "react-router-dom"
import {Button} from "@mui/material";


import AppHeader from './components/appHeader';
import PostList from './components/postList.js';
import CreateAccount from './components/createAccount';
import SignIn from './components/signIn';
import MyPosts from './components/myPosts';
import CreatePost from './components/createPost';
import SinglePost from "./components/singlePost";
import EditPost from './components/editPost';

export const API_URL ="https://blogger-cf-api.herokuapp.com";
// export const API_URL ="http://localhost:8080";

export const PostContext = React.createContext(); 
export const PostUpdate = React.createContext();
export const UserState = React.createContext();

function App() {

  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(sessionStorage.getItem("accessKey"))
  const [selectedPost, selectPost] = useState({});

  const navigate = useNavigate()


  useEffect(()=>{
    getPosts()
    setUser(sessionStorage.getItem("accessKey"))
  },[])

  const getPosts = function(){
    fetch(API_URL + "/posts")
    .then(res => res.json())
    .then(data => {
      setPosts(data) 
    })
  }

  return (
    <div className="App">
      <UserState.Provider value={{user, setUser}}>
      <AppHeader/>
      <main>
      <PostUpdate.Provider value={getPosts}>
      <PostContext.Provider value={posts}>
        <Routes>
          <Route path="/*" element={<PostList selectPost={selectPost}/>}/>
          <Route path="/:postId" element = {<SinglePost post = {selectedPost}/>}/>
          <Route path="/SignIn" element={<SignIn setUser={setUser}/>}/>
          <Route path="/CreateAccount" element={<CreateAccount/>}/>
          <Route path="/MyPosts/" element={<MyPosts selectPost={selectPost}/>}/>
          <Route path="/MyPosts/:postId" element = {<div>
            <SinglePost post = {selectedPost}/>
            <Button variant="outlined" onClick={() => navigate(`/MyPosts/${selectedPost.id}/edit`)}>Edit Post</Button>
          </div>}/>
          <Route path="/MyPosts/:postId/edit" element = {<EditPost post = {selectedPost}/>}/>
          <Route path="/CreatePost" element={<CreatePost/>}/>
        </Routes>
        </PostContext.Provider>
        </PostUpdate.Provider>
      </main>
      </UserState.Provider>
    </div>
  );
}

export default App;
