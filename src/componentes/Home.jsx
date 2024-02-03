import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupList from "../componentes/GroupList";
import UserList from "../componentes/UserList";
import FriendList from "../componentes/FriendList";
import FriendRequest from "../componentes/FriendRequest";
import MyGroup from "../componentes/MyGroup";
import BlockedUser from "../componentes/BlockedUser";

const Home = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="mein_content">
        {/* =====group liss==== */}
        <div className="item">
          <div className="title">
            <h1>Group List</h1>
            <BsThreeDotsVertical />
          </div>
          <GroupList/>
          <GroupList/>
          <GroupList/>
          <GroupList/>
          <GroupList/>
          <GroupList/>
          <GroupList/>
          <GroupList/>
          <GroupList/>
          <GroupList/>
          <GroupList/>
        </div>
        {/* ====user list ==== */}
        <div className="item">
          <div className="title">
            <h1>User List</h1>
            <BsThreeDotsVertical />
          </div>
          <UserList/>
          <UserList/>
          <UserList/>
          <UserList/>
          <UserList/>
          <UserList/>
          <UserList/>
          <UserList/>
          <UserList/>
          <UserList/>
          <UserList/>
        </div>
        {/* ====friend list=== */}
        <div className="item">
          <div className="title">
            <h1>Friend</h1>
            <BsThreeDotsVertical />
          </div>
          <FriendList/>
          <FriendList/>
          <FriendList/>
          <FriendList/>
          <FriendList/>
          <FriendList/>
          <FriendList/>
          <FriendList/>
          <FriendList/>
          <FriendList/>
          <FriendList/>
          <FriendList/>
          <FriendList/>
          <FriendList/>
        </div>
        {/* ====friend requset== */}
        <div className="item">
          <div className="title">
            <h1>Friend Request</h1>
            <BsThreeDotsVertical />
          </div>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
          <FriendRequest/>
        </div>
        {/* ====My group=== */}
        <div className="item">
          <div className="title">
            <h1>My Group</h1>
            <BsThreeDotsVertical />
          </div>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
          <MyGroup/>
        </div>
        {/* ====Block user=== */}
        <div className="item">
          <div className="title">
            <h1>Blocked User</h1>
            <BsThreeDotsVertical />
          </div>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
          <BlockedUser/>
        </div>
      </div>
    </div>
  );
};

export default Home;
