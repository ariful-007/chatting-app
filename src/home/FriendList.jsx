import React, { useEffect, useState } from "react";
import { Button_v_2, Button_v_3 } from "../componentes/Button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import ProfilePicture from "../componentes/ProfilePicture";

const FriendList = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [friendList, setFriendList] = useState([]);
  console.log(friendList);

  useEffect(() => {
    const friendRef = ref(db, "friend");
    onValue(friendRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().receverId ||
          data.uid == item.val().senderId
        ) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setFriendList(list);
    });
  }, []);

  return (
    <div id="all-item">
      <div className="main">
        <h2>Friend List</h2>
        <p>
          {" "}
          <BiDotsVerticalRounded />{" "}
        </p>
      </div>
      {friendList.map((item) => {
        return (
          <div key={item.id} className="flex justify-between items-center p-2">
            <div className=" flex gap-5">
              <div className="img">
                <ProfilePicture imgId={item.senderId} />
              </div>
              <div>
                <h1>{item.senderName}</h1>
              </div>
            </div>
            <div className=" flex gap-3">
              <Button_v_3>Block</Button_v_3>
              <Button_v_2>UnFriend</Button_v_2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendList;
