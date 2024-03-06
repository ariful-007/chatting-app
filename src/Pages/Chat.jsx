import React from 'react';
import Navbar from '../home/Navbar';
import Friend from '../componentes/Friend';
import MesGroup from '../componentes/MesGroup';
import Chatting from '../componentes/Chatting';

const Chat = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className=' flex container mx-auto justify-between'>
        <div className=' w-[30%] '>
          <div className='border-2   border-cyan-600 mt-1 rounded-md overflow-y-scroll h-[300px]'>
            <Friend></Friend>
          </div>
          <div className='border-2  border-cyan-600 mt-1 rounded-md overflow-y-scroll h-[300px]'>
            <MesGroup></MesGroup>
          </div>
        </div>
        
        <div className=' w-[68%]'>
          <Chatting></Chatting>
        </div>
      </div>
    </div>
  );
};

export default Chat;
