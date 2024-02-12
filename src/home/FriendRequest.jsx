import { useEffect, useState } from "react";
import { Button_v_2, Button_v_3 } from "../componentes/Button";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, onValue, ref} from "firebase/database";
import { useSelector } from "react-redux";
import ProfilePicture from "../componentes/ProfilePicture";

const FriendRequest = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo)
  let [friendRequestList, setFriendRequestList] = useState([]);
  console.log(friendRequestList);

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    
    onValue(friendRequestRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if(item.val().receverId === data.uid){
          list.push({...item.val(), id: item.key})
        }
      });
      setFriendRequestList(list);
      
    });
    
  }, []);

  return (
    <div id="all-item">
      <div className="main">
        <h2> Friend Request</h2>
        <p>
          {" "}
          <BiDotsVerticalRounded />{" "}
        </p>
      </div>
      {
         friendRequestList.map((item)=>{
          return(
            <div key={item.id} className="flex justify-between items-center p-2">
          <div className=" flex gap-5">
            <div className="img">
              <ProfilePicture imgId={item.senderId}/>
            </div>
            <div>
              <h1>{item.senderName}</h1>
            </div>
          </div>
          <div className=" flex gap-2">
            <Button_v_2>Accept</Button_v_2>
            <Button_v_3>Decline</Button_v_3>
          </div>
        </div>
          )
        })
      }
    </div>
  );
};

export default FriendRequest;
