import './App.css';
import React, {useEffect, useState} from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom"

import AppHeader from './components/appHeader';
import PostList from './components/postList.js';
import CreateAccount from './components/createAccount';
import SignIn from './components/signIn';
import MyPosts from './components/myPosts';


export const API_URL = "http://localhost:8080"

export const PostContext = React.createContext();
export const UserState = React.createContext();

function App() {

  const [posts, setPosts] = useState([])
  const [account, setAccount] = useState({})
  const [user, setUser] = useState({})


  useEffect(()=>{
    getPosts()
  },[])

  const getPosts = function(){
    let promiseArr = []
    let postArr = []

    fetch(API_URL + "/posts")
    .then(res => res.json())
    .then(data => {
      setPosts(data) 
    })
  }

  const getUsername = async function(id){
    const res = await fetch(API_URL + "/users/username/" + id)
    const data = await res.json()
    console.log(data)
    return data.username
  }

  return (
    <div className="App">
      <AppHeader/>
      <main>
      <UserState.Provider value={user}>
      <PostContext.Provider value={posts}>
        <Routes>
          <Route path="/*" element={<PostList/>}/>
          <Route path="/SignIn" element={<SignIn setUser={setUser}/>}/>
          <Route path="/CreateAccount" element={<CreateAccount/>}/>
          <Route path="/MyPosts/*" element={<MyPosts/>}/>
          <Route path="/CreatePost" element={<div>Create Post</div>}/>
        </Routes>
        </PostContext.Provider>
        </UserState.Provider>
      </main>
    </div>
  );
}

export default App;
