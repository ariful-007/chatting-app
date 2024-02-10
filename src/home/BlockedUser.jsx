import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const BlockedUser = () => {
  return (
    <div id="all-item">
      <div className="main">
        <h2>Blocked User</h2>
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
        <button className=" Button_v_2">Unblock</button>
      </div>
    </div>
  );
};

export default BlockedUser;