import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { FaRegHeart } from "react-icons/fa6";
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import OtherUser from './OtherUser';
import aiIcon from "../assets/12733370611647453187.svg"
import Notifications from '../pages/Notifications';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown } from "react-icons/fi";
function LeftHome() {

    const {userData ,suggestedUsers}=useSelector(state=>state.user)
    const [showMore, setShowMore] = useState(false)
    const [showNotification,setShowNotification]=useState(false)
const dispatch=useDispatch()
const navigate=useNavigate()
const {notificationData}=useSelector(state=>state.user)
    const handleLogOut=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className={`w-[25%] hidden lg:block h-[100vh] bg-transparent ${showNotification?"overflow-hidden":"overflow-auto"}`}>
      <div className='w-full h-[100px] flex items-center justify-between p-[20px]'>
        <img src={logo} alt="" className='w-[80px]'/>
        <div className='relative z-[100]' onClick={()=>setShowNotification(prev=>!prev)}>
      <FaRegHeart className='text-[white] w-[25px] h-[25px]'/>
      {notificationData?.length>0 && notificationData.some((noti)=>noti.isRead===false) && (<div className='w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]'></div>)}
     
        </div>
      </div>

      {!showNotification && <>
<div className='glass-card mx-[10px] rounded-2xl flex items-center w-[calc(100%-20px)] justify-between gap-[10px] px-[12px] py-[10px]'>
        <div className='flex items-center gap-[10px]'>
<div className='w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
    <img src={userData.profileImage || dp} alt="" className='w-full object-cover'/>
</div>
<div >
    <div className='text-[18px] text-white font-semibold '>{userData.userName}</div>
    <div className='text-[15px] text-gray-400 font-semibold '>{userData.name}</div>
</div>
</div>
<div className='text-blue-500 font-semibold cursor-pointer' onClick={handleLogOut}>Log Out</div>
      </div>

<div className='w-full flex flex-col gap-[12px] p-[12px]'>
    <h1 className='text-[white] text-[19px]'>Suggested Users</h1>
    <div className='flex flex-col gap-[10px] overflow-hidden' style={{maxHeight: showMore? '400px' : '150px', transition: 'max-height 260ms ease'}}>
      {suggestedUsers && (showMore ? suggestedUsers : suggestedUsers.slice(0,2)).map((user,index)=>(
          <div key={index} className='glass-card rounded-xl p-[10px]'>
            <OtherUser user={user}/>
          </div>
      ))}
    </div>
    {suggestedUsers && suggestedUsers.length > 0 && (
      <button
        className={`mt-[6px] inline-flex items-center gap-[6px] transition-colors ${suggestedUsers.length>2 ? 'text-white/80 hover:text-white' : 'text-white/40 cursor-not-allowed'}`}
        onClick={()=>{ if(suggestedUsers.length>2){ setShowMore(v=>!v) } }}
        disabled={suggestedUsers.length<=2}
      >
        <span>{showMore ? 'Show less' : (suggestedUsers.length>2 ? 'Show more' : 'No more users')}</span>
        {suggestedUsers.length>2 && (
          <FiChevronDown className={`transition-transform ${showMore? 'rotate-180' : 'rotate-0'}`}/>
        )}
      </button>
    )}
    <div className='mt-[12px] flex-shrink-0'>
      <h2 className='text-white text-[18px] mb-[8px]'>AI Features</h2>
      <div className='glass-card rounded-xl p-[12px] flex items-center gap-[10px] cursor-pointer hover:opacity-95' onClick={()=>navigate('/ai-features')}>
        <img src={aiIcon} alt='AI' className='w-[24px] h-[24px]' />
        <div className='text-white/90'>Explore AI tools</div>
      </div>
      <div className='glass-card rounded-xl p-[12px] flex items-center gap-[10px] mt-[8px] opacity-75 cursor-not-allowed'>
        <img src={aiIcon} alt='Stress Bot' className='w-[24px] h-[24px]' />
        <div className='flex flex-col'>
          <div className='text-white/70 font-medium'>Stress Bot</div>
          <div className='text-white/50 text-[12px]'>Coming soon</div>
        </div>
      </div>
    </div>
</div>
      </>}

      {showNotification && <Notifications/>}
      


    </div>
  )
}

export default LeftHome