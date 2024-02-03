import React from "react";
import { Button_v_2 } from "./Button";

const GroupList = () => {
  return (
    <div className="group_list">
      <div className=" flex gap-8 items-center">
        <div className="img"></div>
        <div>
          <h2>Group Name</h2>
          <p>Hi Guys, Wassup!</p>
        </div>
      </div>
      <div>
        <Button_v_2> Join </Button_v_2>
      </div>
    </div>
  );
};

export default GroupList;
