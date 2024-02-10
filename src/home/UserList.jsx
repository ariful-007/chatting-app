import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  let [userList, setUserList] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);


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
      console.log(userList);
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
      console.log(request);
    });
  }, []);
// friendRequest item end


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
                <img src="" alt="" />
              </div>
              <div>
                <h1>{item.username}</h1>
                <p>{item.email}</p>
              </div>
            </div>
            {friendRequest.includes(item.id + data.uid) ||
            friendRequest.includes(+data.uid + item.id) ? (
              <button className=" Button_v_2">Panding</button>
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
