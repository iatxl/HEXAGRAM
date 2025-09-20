import React from 'react'
import LeftHome from '../components/LeftHome'
import Feed from '../components/Feed'
import RightHome from '../components/RightHome'
import Nav from '../components/Nav'

function Home() {
  return (
    <div className='relative w-full min-h-screen bg-[#0b0b10] flex justify-center items-start overflow-hidden'>
      {/* background glow blobs matching auth pages */}
      <div className='glow-blob glow-purple w-[60vw] h-[60vw] -top-[15%] -right-[10%] absolute opacity-70'></div>
      <div className='glow-blob glow-blue w-[55vw] h-[55vw] -bottom-[20%] -left-[15%] absolute opacity-60' style={{animationDelay:"-1.2s"}}></div>
      <div className='glow-blob glow-pink w-[35vw] h-[35vw] top-[30%] left-[5%] absolute opacity-60' style={{animationDelay:"-2.4s"}}></div>

      {/* content */}
      <div className='relative w-full flex justify-center items-start'>
        <LeftHome/>
        <Feed/>
        <RightHome/>
      </div>

      {/* Bottom Navigation */}
      <Nav />
    </div>
  )
}

export default Home
