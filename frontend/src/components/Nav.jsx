import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import { MdAutoAwesome } from "react-icons/md";
import dp from "../assets/dp.webp"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Nav() {
  const navigate=useNavigate()
  const {userData}=useSelector(state=>state.user)
  return (
    <div className='w-[92%] lg:w-[40%] h-[72px] glass-nav flex justify-around items-center fixed-bottom-center rounded-full'>
      <div onMouseMove={(e)=>{const t=e.currentTarget;const r=t.getBoundingClientRect();t.style.setProperty('--x',((e.clientX-r.left)/r.width)*100+'%');t.style.setProperty('--y',((e.clientY-r.top)/r.height)*100+'%');t.style.setProperty('--s','0.6')}} onMouseEnter={(e)=>e.currentTarget.style.setProperty('--s','0.6')} onMouseLeave={(e)=>e.currentTarget.style.setProperty('--s','0')} onClick={()=>navigate("/")}>
        <GoHomeFill className={`icon-spot w-[25px] h-[25px] ${location.pathname==='/'?'icon-spot-active':''}`}/>
      </div>
      <div onMouseMove={(e)=>{const t=e.currentTarget;const r=t.getBoundingClientRect();t.style.setProperty('--x',((e.clientX-r.left)/r.width)*100+'%');t.style.setProperty('--y',((e.clientY-r.top)/r.height)*100+'%');t.style.setProperty('--s','0.6')}} onMouseEnter={(e)=>e.currentTarget.style.setProperty('--s','0.6')} onMouseLeave={(e)=>e.currentTarget.style.setProperty('--s','0')} onClick={()=>navigate("/search")}>
        <FiSearch className={`icon-spot w-[25px] h-[25px] ${location.pathname==='/search'?'icon-spot-active':''}`}/>
      </div>
      <div onMouseMove={(e)=>{const t=e.currentTarget;const r=t.getBoundingClientRect();t.style.setProperty('--x',((e.clientX-r.left)/r.width)*100+'%');t.style.setProperty('--y',((e.clientY-r.top)/r.height)*100+'%');t.style.setProperty('--s','0.6')}} onMouseEnter={(e)=>e.currentTarget.style.setProperty('--s','0.6')} onMouseLeave={(e)=>e.currentTarget.style.setProperty('--s','0')} onClick={()=>navigate("/upload")}>
        <FiPlusSquare className={`icon-spot w-[25px] h-[25px] ${location.pathname==='/upload'?'icon-spot-active':''}`}/>
      </div>
      <div onMouseMove={(e)=>{const t=e.currentTarget;const r=t.getBoundingClientRect();t.style.setProperty('--x',((e.clientX-r.left)/r.width)*100+'%');t.style.setProperty('--y',((e.clientY-r.top)/r.height)*100+'%');t.style.setProperty('--s','0.6')}} onMouseEnter={(e)=>e.currentTarget.style.setProperty('--s','0.6')} onMouseLeave={(e)=>e.currentTarget.style.setProperty('--s','0')} onClick={()=>navigate("/loops")}>
        <RxVideo className={`icon-spot w-[28px] h-[28px] ${location.pathname==='/loops'?'icon-spot-active':''}`}/>
      </div>
      <div onMouseMove={(e)=>{const t=e.currentTarget;const r=t.getBoundingClientRect();t.style.setProperty('--x',((e.clientX-r.left)/r.width)*100+'%');t.style.setProperty('--y',((e.clientY-r.top)/r.height)*100+'%');t.style.setProperty('--s','0.6')}} onMouseEnter={(e)=>e.currentTarget.style.setProperty('--s','0.6')} onMouseLeave={(e)=>e.currentTarget.style.setProperty('--s','0')} onClick={()=>navigate("/ai-features")}>
        <MdAutoAwesome className={`icon-spot w-[25px] h-[25px] ${location.pathname==='/ai-features'?'icon-spot-active':''}`}/>
      </div>
      <div className='w-[40px] h-[40px] border border-white/10 rounded-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/profile/${userData.userName}`)}>
         <img src={userData.profileImage || dp} alt="" className='w-full object-cover'/>
      </div>
    </div>
  )
}

export default Nav
