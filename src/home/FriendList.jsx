import React from 'react';
import { Button_v_2, Button_v_3 } from '../componentes/Button';

const FriendList = () => {
  return (
    <div className="all_items ">
      <div className="all_item-1">
        <div className="all_item-2 ">
          <img src="" alt="" />
        </div>
        <div className="all_item_text">
          <h1>Group Name</h1>
          <p>Hi Guys,Wassup!</p>
        </div>
      </div>
      <div className=' flex gap-2'>
      <Button_v_2>Block</Button_v_2>
      <Button_v_3>UnFriend</Button_v_3>
      </div>
    </div>
  );
};

export default FriendList;