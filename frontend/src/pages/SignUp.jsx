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
function SignUp() {
const [focusName,setFocusName]=useState(false)
const [focusUser,setFocusUser]=useState(false)
const [focusEmail,setFocusEmail]=useState(false)
const [focusPassword,setFocusPassword]=useState(false)
const [showPassword,setShowPassword]=useState(false)
const [loading,setLoading]=useState(false)
const [name,setName]=useState("")
const [userName,setUserName]=useState("")
const [err,setErr]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate=useNavigate()
const dispatch=useDispatch()
const handleSignUp=async ()=>{
  setLoading(true)
  setErr("")

  try {
    const result=await axios.post(`${serverUrl}/api/auth/signup`,{name,userName,email,password},{withCredentials:true})
    dispatch(setUserData(result.data))
    setLoading(false)
  } catch (error) {
    setErr(error.response?.data?.message)
    console.log(error)
    setLoading(false)
  }
}


  return (
    <div className='relative w-full h-screen bg-[#0b0b10] flex flex-col justify-center items-center overflow-hidden'>
      <div className='glow-blob glow-purple w-[60vw] h-[60vw] -top-[10%] -right-[10%] absolute opacity-70'></div>
      <div className='glow-blob glow-blue w-[55vw] h-[55vw] -bottom-[15%] -left-[10%] absolute opacity-60' style={{animationDelay:"-1.2s"}}></div>
      <div className='glow-blob glow-pink w-[35vw] h-[35vw] top-[20%] left-[10%] absolute opacity-60' style={{animationDelay:"-2.4s"}}></div>
      <div className='relative w-[92%] lg:max-w-[900px]  h-[640px] rounded-2xl flex justify-center items-center overflow-hidden glass-card'>
<div className='w-full lg:w-[55%] h-full flex flex-col items-center p-[10px] gap-[20px] text-white'>

<div className='flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]'>
    <span>Sign Up to</span>
    <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 drop-shadow'>HEXAGRAM</span>
</div>

<div className='float-field flex items-center justify-start w-[90%] h-[56px] rounded-2xl mt-[22px]'>
    <label htmlFor='name' className={`float-label ${ (focusName || name) ? 'float-label-active' : '' }`}> Enter Your Name</label>
        <input type="text" id='name' className='modern-input w-[100%] h-[100%] rounded-2xl px-[16px]'
        required onFocus={()=>setFocusName(true)} onBlur={()=>setFocusName(false)} onChange={(e)=>setName(e.target.value)} value={name}/>
    
</div>
<div className='float-field flex items-center justify-start w-[90%] h-[56px] rounded-2xl'>
    <label htmlFor='userName' className={`float-label ${ (focusUser || userName) ? 'float-label-active' : '' }`}> Enter Username</label>
        <input type="text" id='userName' className='modern-input w-[100%] h-[100%] rounded-2xl px-[16px]'
        required onFocus={()=>setFocusUser(true)} onBlur={()=>setFocusUser(false)} onChange={(e)=>setUserName(e.target.value)} value={userName}/>
    
</div>
<div className='float-field flex items-center justify-start w-[90%] h-[56px] rounded-2xl'>
    <label htmlFor='email' className={`float-label ${ (focusEmail || email) ? 'float-label-active' : '' }`}> Enter Email</label>
        <input type="email" id='email' className='modern-input w-[100%] h-[100%] rounded-2xl px-[16px]'
        required onFocus={()=>setFocusEmail(true)} onBlur={()=>setFocusEmail(false)} onChange={(e)=>setEmail(e.target.value)} value={email}/>
    
</div>
<div className='float-field flex items-center justify-start w-[90%] h-[56px] rounded-2xl'>
    <label htmlFor='password' className={`float-label ${ (focusPassword || password) ? 'float-label-active' : '' }`}> Enter password</label>
        <input type={showPassword?"text":"password"} id='password' className='modern-input w-[100%] h-[100%] rounded-2xl px-[16px] pr-[48px]'
        required onFocus={()=>setFocusPassword(true)} onBlur={()=>setFocusPassword(false)} onChange={(e)=>setPassword(e.target.value)} value={password}/>
        {!showPassword?<IoIosEye className='absolute cursor-pointer right-[24px] w-[22px] h-[22px] text-gray-300' onClick={()=>setShowPassword(true)}/>:<IoIosEyeOff className='absolute cursor-pointer right-[24px] w-[22px] h-[22px] text-gray-300' onClick={()=>setShowPassword(false)}/>} 
</div>
{err && <p className='text-red-400'>{err}</p>}


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
onClick={handleSignUp}
disabled={loading}
>
{loading?<ClipLoader size={30} color='white'/>:"Create account"}
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
    <span className='text-sm'>Sign up with Google</span>
  </button>
  <button
    className='flex-1 h-[42px] rounded-full btn-spotlight text-white flex items-center justify-center gap-2'
    onMouseMove={(e)=>{ const t=e.currentTarget; const r=t.getBoundingClientRect(); const x=((e.clientX-r.left)/r.width)*100+"%"; const y=((e.clientY-r.top)/r.height)*100+"%"; t.style.setProperty('--x',x); t.style.setProperty('--y',y); t.style.setProperty('--spot-opacity','0.9'); }}
    onMouseEnter={(e)=>{ e.currentTarget.style.setProperty('--spot-opacity','0.9'); }}
    onMouseLeave={(e)=>{ e.currentTarget.style.setProperty('--spot-opacity','0'); }}
    onClick={()=>{ window.location.href = `${serverUrl}/api/auth/github`; }}
  >
    <FaGithub />
    <span className='text-sm'>Sign up with GitHub</span>
  </button>
</div>
<p className='cursor-pointer text-gray-300' onClick={()=>navigate("/signin")}>Already Have An Account ? <span className='border-b-2 border-b-gray-300 pb-[3px] text-white'>Sign In</span></p>
</div>
<div className='md:w-[45%] h-full hidden lg:flex justify-center items-center flex-col gap-[14px] text-white text-[16px] font-semibold'>
<img src={logo1} alt="" className='w-[42%] drop-shadow-[0_10px_40px_rgba(139,92,246,0.45)]'/>
<p className='text-gray-300'>Not Just A Platform , It's A VYBE</p>
</div>
      </div>
    </div>
  )
}

export default SignUp
