import React, { useEffect } from "react";
import Navbar from "../home/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GroupList from "../home/GroupList";
import FriendList from "../home/FriendList";
import FriendRequest from "../home/FriendRequest";
import MyGroup from "../home/MyGroup";
import BlockedUser from "../home/BlockedUser";
import UserList from "./UserList";

const Home = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  });

  return (
    <div>
      <Navbar />
      <div className="main_item">
        <div className="main_item-1">
          <GroupList/>
        </div>

        <div className="main_item-1">
          <UserList/>
        </div>

        <div className="main_item-1">
          <FriendList />
        </div>

        <div className="main_item-1">
          <FriendRequest />
        </div>

        <div className="main_item-1">
        <MyGroup/>
        </div>

        <div className="main_item-1">
        <BlockedUser />
        
        </div>
      </div>
    </div>
  );
};

export default Home;
