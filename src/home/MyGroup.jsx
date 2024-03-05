import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import ProfilePicture from "../componentes/ProfilePicture";

const MyGroup = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [groupList, setGroupList] = useState([]);
  const [showRequest, setShowRequest] = useState(false);
  const [groupJoinRequest, setGroupJoinRequest] = useState([])
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [groupMember, setGroupMember] = useState([]);

// create a new group start

  const groupRef = ref(db, "group");
  useEffect(() => {
    onValue(groupRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setGroupList(list);
    });
  }, []);
// create a new group end

// group delete start
  const handelGroupDelete = (item) => {
    remove(ref(db, "group/" + item.key));
  };
// group delete end

// group request start
  const handelGroupRequest = (group) => {
    setShowRequest(!showRequest);

    const groupRequestRef = ref(db, "groupJoinRequest")

    onValue(groupRequestRef, (snapshot) => {
      const list = []
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId && item.val().groupId == group.key) {
          list.push({...item.val(), key: item.key })
        }
      })
      setGroupJoinRequest(list)
    })
  };
// group request end
// handle group join accepted start
const  handelGroupAccept =(item)=>{
  set(push(ref(db, 'groupMembers')),{
    groupId: item.groupId,
    groupName: item.groupName,
    adminId: item.adminId,
    adminName:item.adminName,
    userId: item.userId,
    userName: item.userName,
  })
  .then(()=>{
    remove(ref(db, "groupJoinRequest/" + item.key))
  })
}
// handle group join accepted end

// group join rejected start
  const handelGroupReject = (item) => {
    remove(ref(db, "groupJoinRequest/" + item.key));
  };
// group join rejected end

// handle group info start
const handelGroupInfo = (itemInfo) => {
  setShowGroupInfo(!showGroupInfo);
  const groupMemberRef = ref(db, "groupMembers");
  onValue(groupMemberRef, (snapshot) => {
    const list = []
    snapshot.forEach((item) =>{
      if(data.uid == itemInfo.adminId && item.val().groupId == itemInfo.key){
        list.push({...item.val(), key: item.key})
      }
    })
    setGroupMember(list)
  })
}
// handle group info end

// handel group members delete start
  const handelGroupMembersDelete = (item) => {
    remove(ref(db, "groupMembers/" + item.key));
  };
// handel group members delete end




  return (
    <div id="all-item">
      <div className="main">
        <h2>My Group</h2>
        <p>
          {" "}
          <BiDotsVerticalRounded />{" "}
        </p>
      </div>
      {
        groupList.length == 0?
        <h1 className=" text-xl text-black font-bold text-center mt-3">No Group available</h1>
        :
        showRequest ?
        <div className=" bg-blue-600 rounded-lg p-10 relative">
          <button onClick={()=>setShowRequest(!showRequest)} className="Button_v_3 absolute w-auto right-1 top-1">close</button>
          {
            groupJoinRequest.map((item,i)=>{
              return(
                <div key={i} className="flex justify-between items-center  bg-slate-200 p-3 rounded-lg mt-5">
                <div className=" flex gap-5 items-center">
                  <div className="img flex justify-center items-center">
                  <ProfilePicture imgId={item.userId}/>
                  </div>
                  <div>
                    <h1>{item.userName}</h1>
                  </div>
                </div>
                <button onClick={()=>handelGroupAccept(item)} className=" Button_v_3"> Accept </button>
                <button onClick={()=>handelGroupReject(item)} className=" Button_v_3"> Decline </button>
              </div>
              )
            })
          }
        </div>
        :
        showGroupInfo ?
        <div className=" bg-blue-600 rounded-lg p-10 relative">
          <button onClick={()=>setShowGroupInfo(!showGroupInfo)} className="Button_v_3 absolute w-auto right-1 top-1">close</button>
          {
            groupMember.map((item,i)=>{
              return(
                <div key={i} className="flex justify-between items-center  bg-slate-200 p-3 rounded-lg mt-5">
                <div className=" flex gap-5 items-center">
                  <div className="img flex justify-center items-center">
                  <ProfilePicture imgId={item.userId}/>
                  </div>
                  <div>
                    <h1>{item.userName}</h1>
                  </div>
                </div>
                <button onClick={()=>handelGroupAccept(item)} className=" Button_v_3"> Accept </button>
                <button onClick={()=>handelGroupMembersDelete(item)} className=" Button_v_3"> Decline </button>
              </div>
              )
            })
          }
        </div>
        :
        groupList.map((item, i) => {
          return (
            <div key={i} className="flex justify-between items-center p-2">
              <div className=" flex gap-5">
                <div className="img flex justify-center items-center">
                <h1>{item.adminName[0]}</h1>
                </div>
                <div>
                  
                  <h1>{item.groupName}</h1>
                  <p className=" text-base font-bold text-black uppercase">
                    {item.groupIntro}
                  </p>
                </div>
              </div>
              <button onClick={()=>handelGroupInfo(item)} className=" Button_v_2">Info</button>
              <button onClick={()=>handelGroupRequest(item)} className=" Button_v_3">Request</button>
              <button onClick={()=>handelGroupDelete(item)} className=" Button_v_2">Delete</button>
            </div>
          );
        })
      }
      
    </div>
  );
};

export default MyGroup;
