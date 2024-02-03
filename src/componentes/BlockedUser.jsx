import React from 'react';
import { Button_v_2 } from './Button';

const BlockedUser = () => {
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
        <Button_v_2>Unblock</Button_v_2>
      </div>
    </div>
  );
};

export default BlockedUser;