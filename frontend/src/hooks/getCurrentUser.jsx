import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing, setUserData } from '../redux/userSlice'
import { setCurrentUserStory } from '../redux/storySlice'

function getCurrentUser() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)

  useEffect(()=>{
    const fetchUser=async ()=>{
        try {
            console.log("Fetching current user...")
            const result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
            console.log("Current user fetched successfully:", result.data)
             dispatch(setUserData(result.data))
             dispatch(setCurrentUserStory(result.data.story))
        } catch (error) {
            console.log("Error fetching current user:", error)
            console.log("Error response:", error.response?.data)
            // Clear user data if authentication fails
            dispatch(setUserData(null))
        }
    }

    // Only fetch if user is not already loaded
    if(!userData){
        fetchUser()
    }
  },[dispatch, userData])
}

export default getCurrentUser
