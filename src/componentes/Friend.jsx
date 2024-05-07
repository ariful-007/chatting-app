import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import ProfilePicture from "../componentes/ProfilePicture";
import { activeCaht } from "../slice/ActiveSlice";

const Friend = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [friendList, setFriendList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const friendRef = ref(db, "friend");
    onValue(friendRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().receverId ||
          data.uid == item.val().senderId
        ) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setFriendList(list);
    });
  }, []);

  // handel active Friend start
  const handelActiveFriend = (item) => {
    if (item.receverId == data.uid) {
      dispatch(
        activeCaht({
          status: "single",
          id: item.senderId,
          name: item.senderName,
        })
      );
      localStorage.setItem(
        "activeFriend",
        JSON.stringify({
          status: "single",
          id: item.senderId,
          name: item.senderName,
        })
      );
    } else {
      dispatch(
        activeCaht({
          status: "single",
          id: item.receverId,
          name: item.receverName,
        })
      );
      localStorage.setItem(
        "activeFriend",
        JSON.stringify({
          status: "single",
          id: item.receverId,
          name: item.receverName,
        })
      );
    }
  };

  return (
    <div id="friend">
      <div className="main">
        <h2>Friends List</h2>
      </div>
      {friendList.map((item, i) => {
        return (
          <div key={i} className="flex justify-between items-center p-2">
            <div className=" flex gap-5 items-center ">
              <div className="img">
                <ProfilePicture
                  imgId={
                    data.uid == item.senderId ? item.receverId : item.senderId
                  }
                />
              </div>
              <div>
                {data.uid == item.senderId ? (
                  <h1>{item.receverName}</h1>
                ) : (
                  <h1>{item.senderName}</h1>
                )}
              </div>
            </div>
            <div className=" flex gap-3">
              <div
                onClick={() => handelActiveFriend(item)}
                className="Button_v_2 cursor-pointer"
              >
                Message
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Friend;
