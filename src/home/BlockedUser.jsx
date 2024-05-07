import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import ProfilePicture from "../componentes/ProfilePicture";

const BlockedUser = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [blockedList, setBlockedList] = useState([]);

  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().blockById) {
          list.push({
            id: item.key,
            block: item.val().block,
            blockId: item.val().blockId,
          });
        } else {
          list.push({
            id: item.key,
            blockBy: item.val().blockBy,
            blockById: item.val().blockById,
          });
        }
      });
      setBlockedList(list);
    });
  }, []);

  const handelUnBlock = (item) => {
    set(push(ref(db, "friend")), {
      senderId: item.blockId,
      senderName: item.block,
      receverId: data.uid,
      receverName: data.displayName,
    }).then(() => {
      remove(ref(db, "block/" + item.id));
    });
  };

  return (
    <div id="all-item">
      <div className="main">
        <h2>Blocked User</h2>
        <p>
          {" "}
          <BiDotsVerticalRounded />{" "}
        </p>
      </div>
      {blockedList.map((item, i) => {
        return (
          <div key={i} className="flex justify-between items-center p-2">
            <div className=" flex gap-5">
              <div className="img">
                {item.blockById ? (
                  <ProfilePicture imgId={item.blockById} />
                ) : (
                  <ProfilePicture imgId={item.blockId} />
                )}
              </div>
              <div>
                <h1>{item.block ? item.block : item.blockBy}</h1>
              </div>
            </div>
            {item.blockById ? (
              <button className=" Button_v_2">I Blocked You</button>
            ) : (
              <button
                onClick={() => handelUnBlock(item)}
                className=" Button_v_3"
              >
                Unblock
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BlockedUser;
