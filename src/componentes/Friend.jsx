
import React, { useEffect, useState } from "react";
import { Button_v_2,} from "../componentes/Button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import ProfilePicture from "../componentes/ProfilePicture";

const Friend = () => {
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
          list.push({ ...item.val(), key: item.key });
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
        remove(ref(db, "friend/" + item.key))
      })
    }else{
      set(push(ref(db, "block")),{
        block: item.senderName,
        blockId: item.senderId,
        blockBy: item.receverName,
        blockById: item.receverId
      }).then(()=>{
        remove(ref(db, "friend/" + item.key))
      })
    }
  }
  // block list end

  return (
    <div id="friend">
      <div className="main">
        <h2>Friends List</h2>
      </div>
      {friendList.map((item,i) => {
        return (
          <div key={i} className="flex justify-between items-center p-2">
            <div className=" flex gap-5 items-center ">
              <div className="img">
                <ProfilePicture imgId={data.uid == item.senderId ? item.receverId : item.senderId} />
              </div>
              <div>
                {
                  data.uid == item.senderId?
                  <h1>{item.receverName}</h1>
                  :
                  <h1>{item.senderName}</h1>
                }
              </div>
            </div>
            <div className=" flex gap-3">
              <div onClick={()=>handelBlock(item)}><Button_v_2>Message</Button_v_2></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Friend;
