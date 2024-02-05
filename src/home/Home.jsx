import React, { useEffect } from "react";
import Navbar from "../home/Navbar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GroupList from "../home/GroupList";
import UserList from "../home/UserList";
import FriendList from "../home/FriendList";
import FriendRequest from "../home/FriendRequest";
import MyGroup from "../home/MyGroup";
import BlockedUser from "../home/BlockedUser";

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
          <div className="item_text">
            <h2>Group List</h2>
            <p>
              {" "}
              <BiDotsVerticalRounded />{" "}
            </p>
          </div>
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
          <GroupList />
        </div>

        <div className="main_item-1">
          <div className="item_text">
            <h2>User List</h2>
            <p>
              {" "}
              <BiDotsVerticalRounded />{" "}
            </p>
          </div>
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
          <UserList />
        </div>

        <div className="main_item-1">
          <div className="item_text">
            <h2>Friend</h2>
            <p>
              {" "}
              <BiDotsVerticalRounded />{" "}
            </p>
          </div>
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
          <FriendList />
        </div>

        <div className="main_item-1">
          <div className="item_text">
            <h2>Friend Request</h2>
            <p>
              {" "}
              <BiDotsVerticalRounded />{" "}
            </p>
          </div>
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
          <FriendRequest />
        </div>

        <div className="main_item-1">
          <div className="item_text">
            <h2>My Group</h2>
            <p>
              {" "}
              <BiDotsVerticalRounded />{" "}
            </p>
          </div>
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
          <MyGroup />
        </div>

        <div className="main_item-1">
          <div className="item_text">
            <h2>Blocked User</h2>
            <p>
              {" "}
              <BiDotsVerticalRounded />{" "}
            </p>
          </div>
          <BlockedUser />
          <BlockedUser />
          <BlockedUser />
          <BlockedUser />
          <BlockedUser />
          <BlockedUser />
          <BlockedUser />
          <BlockedUser />
          <BlockedUser />
          <BlockedUser />
          <BlockedUser />
          <BlockedUser />
        </div>
      </div>
    </div>
  );
};

export default Home;
