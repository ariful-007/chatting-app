import React, { useEffect, useState } from "react";
import { Button_v_2, Button_v_3 } from "../componentes/Button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import ProfilePicture from "../componentes/ProfilePicture";

const FriendList = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [friendList, setFriendList] = useState([]);

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


  // block list start
  const handelBlock=(item)=>{
    if(data.uid == item.senderId){
      set(push(ref(db, "block")),{
        block: item.receverName,
        blockId: item.receverId,
        blockBy: item.senderName,
        blockById: item.senderId
      }).then(()=>{
        remove(ref(db, "friend/" + item.id))
      })
    }else{
      set(push(ref(db, "block")),{
        block: item.senderName,
        blockId: item.senderId,
        blockBy: item.receverName,
        blockById: item.receverId
      }).then(()=>{
        remove(ref(db, "friend/" + item.id))
      })
    }
  }
  // block list end

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
                <ProfilePicture imgId={data.uid == item.senderId ? item.receverId : item.senderId} />
              </div>
              <div>
                {
                  data.uid == item.senderId?
                  <h1>{item?.receverName}</h1>
                  :
                  <h1>{item?.senderName}</h1>
                }
                <h2>Hello...</h2>
              </div>
            </div>
            <div className=" flex gap-3">
              <div onClick={()=>handelBlock(item)}><Button_v_3>Block</Button_v_3></div>
              <Button_v_2>UnFriend</Button_v_2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendList;
