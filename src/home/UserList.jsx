import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "../componentes/ProfilePicture";

const UserList = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  let [userList, setUserList] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [friendList, setFriendList] = useState([]);

  // user item stsrt
  useEffect(() => {
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      const users = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          users.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(users);
    });
  }, []);
  // user item end

  // friendRequest item stsrt
  const handelFriendRequestSent = (item) => {
    set(push(ref(db, "friendRequest")), {
      senderId: data.uid,
      senderName: data.displayName,
      receverId: item.id,
      receverName: item.username,
    });
  };

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      const request = [];
      snapshot.forEach((item) => {
        request.push(item.val().receverId + item.val().senderId);
      });
      setFriendRequest(request);
    });
  }, []);
  // friendRequest item end
  // friend list data from friend collection stsrt
  useEffect(() => {
    const friendRef = ref(db, "friend");
    onValue(friendRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        list.push(item.val().receverId + item.val().senderId);
      });
      setFriendList(list);
    });
  }, []);
  // friend list data from friend collection end

  return (
    <div id="all-item">
      <div className="main">
        <h2>User List</h2>
        <p>
          {" "}
          <BiDotsVerticalRounded />{" "}
        </p>
      </div>
      {userList.map((item, i) => {
        return (
          <div key={i} className="flex justify-between items-center p-2">
            <div className=" flex gap-5">
              <div className="img">
                <ProfilePicture imgId={item?.id} />
              </div>
              <div>
                <h1>{item?.username}</h1>
                <p>{item?.email}</p>
              </div>
            </div>

            {friendList.includes(item?.id + data?.uid) ||
            friendList.includes(data?.uid + item?.id) ? (
              <button className=" Button_v_2">Friend</button>
            ) : friendRequest.includes(item?.id + data?.uid) ||
              friendRequest.includes(data?.uid + item?.id) ? (
              <button className=" Button_v_2">Cencel</button>
            ) : (
              <button
                onClick={() => handelFriendRequestSent(item)}
                className=" Button_v_2"
              >
                Add Friend
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
