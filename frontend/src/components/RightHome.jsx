import React from 'react'
import Messages from '../pages/Messages'

function RightHome() {
  return (
    <div className='w-[25%] min-h-[100vh] bg-transparent hidden lg:block'>
      <div className='glass-card m-[10px] rounded-2xl overflow-hidden'>
        <Messages/>
      </div>
    </div>
  )
}

export default RightHome
