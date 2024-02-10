import React from 'react';
import { Button_v_2, Button_v_3 } from '../componentes/Button';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const FriendList = () => {
  return (
    <div id="all-item">
      <div className="main">
        <h2>Friend List</h2>
        <p> <BiDotsVerticalRounded /> </p>
      </div>
      <div className="flex justify-between items-center p-2">
        <div className=" flex gap-5">
          <div className="img">
            <img src="" alt="" />
          </div>
          <div>
            <h1>Group Name</h1>
            <p>Hi Guys,Wassup!</p>
          </div>
        </div>
        <div className=' flex gap-3'>
        <Button_v_3>Block</Button_v_3>
        <Button_v_2>UnFriend</Button_v_2>
        </div>
      </div>
    </div>
  );
};

      

export default FriendList;