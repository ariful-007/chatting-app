import React from 'react';
import { Button_v_2, Button_v_3 } from './Button';

const FriendList = () => {
  return (
    <div className="group_list">
      <div className=" flex gap-8 items-center">
        <div className="img"></div>
        <div>
          <h2>Group Name</h2>
          <p>Hi Guys, Wassup!</p>
        </div>
      </div>
      <div className=' flex gap-2'>
        <Button_v_2>Block</Button_v_2>
        <Button_v_3>Unfriend</Button_v_3>
      </div>
    </div>
  );
};

export default FriendList;