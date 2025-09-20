import React, { useState } from 'react'
import logo1 from "../assets/logo.png"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios"
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function SignIn() {
const [inputClicked,setInputClicked]=useState({
    userName:false,
    password:false
})
const [showPassword,setShowPassword]=useState(false)
const [loading,setLoading]=useState(false)
const [userName,setUserName]=useState("")
const [password,setPassword]=useState("")
const [err,setErr]=useState("")
const navigate=useNavigate()
const dispatch=useDispatch()
const handleSignIn=async ()=>{
  setLoading(true)
  setErr("")
  try {
    console.log("Attempting to sign in with:", {userName, password})
    const result=await axios.post(`${serverUrl}/api/auth/signin`,{userName,password},{withCredentials:true})
    console.log("Sign in successful:", result.data)
   dispatch(setUserData(result.data))
    setLoading(false)
  } catch (error) {
    console.log("Sign in error:", error)
    console.log("Error response:", error.response?.data)
    setLoading(false)
    setErr(error.response?.data?.message || "Sign in failed")
  }
}


  return (
    <div className='relative w-full h-screen bg-[#0b0b10] flex flex-col justify-center items-center overflow-hidden'>
      <div className='glow-blob glow-purple w-[60vw] h-[60vw] -top-[10%] -right-[10%] absolute opacity-70'></div>
      <div className='glow-blob glow-blue w-[55vw] h-[55vw] -bottom-[15%] -left-[10%] absolute opacity-60' style={{animationDelay:"-1.2s"}}></div>
      <div className='glow-blob glow-pink w-[35vw] h-[35vw] top-[20%] left-[10%] absolute opacity-60' style={{animationDelay:"-2.4s"}}></div>
      <div className='relative w-[92%] lg:max-w-[900px]  h-[640px] rounded-2xl flex justify-center items-center overflow-hidden glass-card'>
<div className='w-full lg:w-[55%] h-full flex flex-col items-center justify-center p-[10px] gap-[20px] text-white'>

<div className='flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]'>
    <span>Sign In to</span>
    <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 drop-shadow'>HEXAGRAM</span>
</div>


<div className='relative flex items-center justify-start w-[90%] h-[54px] rounded-2xl' onClick={()=>setInputClicked({...inputClicked,userName:true})}>
    <label htmlFor='userName' className={`absolute left-[16px] px-[6px] text-[14px] transition-all ${inputClicked.userName?"-top-3 text-gray-300":"top-4 text-gray-400"}`}> Enter Username</label>
        <input type="text" id='userName' className='modern-input w-[100%] h-[100%] rounded-2xl px-[16px]' required onChange={(e)=>setUserName(e.target.value)} value={userName}/>
    
</div>

<div className='relative flex items-center justify-start w-[90%] h-[54px] rounded-2xl' onClick={()=>setInputClicked({...inputClicked,password:true})}>
    <label htmlFor='password' className={`absolute left-[16px] px-[6px] text-[14px] transition-all ${inputClicked.password?"-top-3 text-gray-300":"top-4 text-gray-400"}`}> Enter password</label>
        <input type={showPassword?"text":"password"} id='password' className='modern-input w-[100%] h-[100%] rounded-2xl px-[16px] pr-[48px]' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
        {!showPassword?<IoIosEye className='absolute cursor-pointer right-[24px] w-[22px] h-[22px] text-gray-300' onClick={()=>setShowPassword(true)}/>:<IoIosEyeOff className='absolute cursor-pointer right-[24px] w-[22px] h-[22px] text-gray-300' onClick={()=>setShowPassword(false)}/>} 
        
</div>
<div className='w-[90%] px-[20px] cursor-pointer text-gray-300' onClick={()=>navigate("/forgot-password")}>Forgot Password</div>

{err && <p className='text-red-500'>{err}</p>}

<button
className='w-[70%] px-[20px] py-[12px] btn-spotlight font-semibold h-[52px] cursor-pointer rounded-2xl mt-[30px]'
onMouseMove={(e)=>{
  const target=e.currentTarget;
  const rect=target.getBoundingClientRect();
  const x=((e.clientX-rect.left)/rect.width)*100+"%";
  const y=((e.clientY-rect.top)/rect.height)*100+"%";
  target.style.setProperty('--x', x);
  target.style.setProperty('--y', y);
  target.style.setProperty('--spot-opacity','0.9');
}}
onMouseEnter={(e)=>{
  e.currentTarget.style.setProperty('--spot-opacity','0.9');
}}
onMouseLeave={(e)=>{
  e.currentTarget.style.setProperty('--spot-opacity','0');
}}
onClick={handleSignIn}
disabled={loading}
>
{loading?<ClipLoader size={30} color='white'/>:"Sign in"}
</button>
{/* Divider */}
<div className='w-[90%] flex items-center gap-3 my-[18px]'>
  <div className='h-[1px] flex-1 bg-white/10'></div>
  <span className='text-white/60 text-sm'>OR</span>
  <div className='h-[1px] flex-1 bg-white/10'></div>
</div>
{/* Social buttons */}
<div className='w-[90%] flex gap-3'>
  <button
    className='flex-1 h-[42px] rounded-full btn-spotlight text-white flex items-center justify-center gap-2'
    onMouseMove={(e)=>{ const t=e.currentTarget; const r=t.getBoundingClientRect(); const x=((e.clientX-r.left)/r.width)*100+"%"; const y=((e.clientY-r.top)/r.height)*100+"%"; t.style.setProperty('--x',x); t.style.setProperty('--y',y); t.style.setProperty('--spot-opacity','0.9'); }}
    onMouseEnter={(e)=>{ e.currentTarget.style.setProperty('--spot-opacity','0.9'); }}
    onMouseLeave={(e)=>{ e.currentTarget.style.setProperty('--spot-opacity','0'); }}
    onClick={()=>{ window.location.href = `${serverUrl}/api/auth/google`; }}
  >
    <FaGoogle className='text-[#DB4437]' />
    <span className='text-sm'>Sign in with Google</span>
  </button>
  <button
    className='flex-1 h-[42px] rounded-full btn-spotlight text-white flex items-center justify-center gap-2'
    onMouseMove={(e)=>{ const t=e.currentTarget; const r=t.getBoundingClientRect(); const x=((e.clientX-r.left)/r.width)*100+"%"; const y=((e.clientY-r.top)/r.height)*100+"%"; t.style.setProperty('--x',x); t.style.setProperty('--y',y); t.style.setProperty('--spot-opacity','0.9'); }}
    onMouseEnter={(e)=>{ e.currentTarget.style.setProperty('--spot-opacity','0.9'); }}
    onMouseLeave={(e)=>{ e.currentTarget.style.setProperty('--spot-opacity','0'); }}
    onClick={()=>{ window.location.href = `${serverUrl}/api/auth/github`; }}
  >
    <FaGithub />
    <span className='text-sm'>Sign in with GitHub</span>
  </button>
</div>
<p className='cursor-pointer text-gray-300' onClick={()=>navigate("/signup")}>Want To Create A New Account ? <span className='border-b-2 border-b-gray-300 pb-[3px] text-white'>Sign Up</span></p>
</div>
<div className='md:w-[45%] h-full hidden lg:flex justify-center items-center flex-col gap-[14px] text-white text-[16px] font-semibold'>
<img src={logo1} alt="" className='w-[42%] drop-shadow-[0_10px_40px_rgba(139,92,246,0.45)]'/>
<p className='text-gray-300'>Not Just A Platform , It's A VYBE</p>
</div>
      </div>
    </div>
  )
}

export default SignIn
