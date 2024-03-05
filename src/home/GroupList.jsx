import { getDatabase, push, ref, set, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const GroupList = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const [show, setShow]= useState(false);
  const [groupName, setGroupName]= useState('');
  const [groupIntro, setGroupIntro]= useState(''); 
  const [groupNameError, setGroupNameError] = useState('');
  const [groupList, setGroupList] = useState([]); 

  const handleGroupName =(e)=>{
    setGroupName(e.target.value);
    setGroupNameError('');
  }

  const handleGroupIntro =(e)=>{ 
    setGroupIntro(e.target.value);
    setGroupNameError('');
  }

  const handleCreateGroup = ()=>{
    if(groupName === ''){
      setGroupNameError('Group name is required');
    }
    else if(groupIntro==''){ // corrected condition
      setGroupNameError('Group intro must be at least 3 characters');
    }
    else {
      set(push(ref(db, "group")),{
        groupName: groupName,
        groupIntro: groupIntro, // corrected variable name
        adminName: data.displayName,
        adminId: data.uid
      }).then(()=>{
        toast.success("Group Created");
        setShow(false);
        setGroupName('');
        setGroupIntro(''); // corrected variable name
      });
    }
  }

 // get group list start 
 useEffect(()=>{
   const groupRef = ref(db, "group");
   onValue(groupRef, (snapshot) => {
     const list = [];
     snapshot.forEach((item) => {
       if (data.uid != item.val().adminId) {
         list.push({...item.val(), id: item.key });
       }
     });
     setGroupList(list);
   });
 },[])
 // get group list end 
//  handel join group list start
 const handelJoinGroup = (item) => {
   set(
     push(ref(db, "groupJoinRequest"), {
       groupId: item.id,
       groupName: item.groupName,
       groupIntro: item.groupIntro, 
       adminName: item.adminName,
       adminId: item.adminId,
       userId:data.uid,
       userName:data.displayName
     }).then(()=>{
       toast.success("Request sent");
       setShow(false);
       setGroupName('');
       setGroupIntro(''); 
     })
   );
 };
//  handel join group list end

  return (
    <div id="all-item">
      <div className="main">
        <h2>Group List</h2>
        <button onClick={()=> setShow(!show)} className="Button_v_3">{show? "Cancel":"Create group"}</button>
      </div>
      {
        show?
        <div className=" p-4 bg-blue-500 rounded-lg">
          <input onChange={handleGroupName} type="text" placeholder="Group Name"  className=" outline-none p-2 w-full rounded-lg py-1"/>
          <p className=" text-red-500">{groupNameError}</p>
          <input onChange={handleGroupIntro} type="text" placeholder="Group Intro" className=" outline-none p-2 w-full rounded-lg py-1 mt-3"/>
          <p className=" text-red-500">{groupNameError}</p> {/* corrected variable name */}
          <button onClick={handleCreateGroup} className="Button_v_3 w-full">Create</button>
        </div>
        :
        <div>
  {
    groupList.map((item, i) => {
      return (
        <div key={i} className="flex justify-between items-center p-2">
          <div className="flex gap-5">
            <div className="img">
              
            </div>
            <div>
            <h1>Admin:{item.adminName}</h1>
              <h1>{item.groupName}</h1> 
              <p>{item.groupIntro}</p> 
            </div>
          </div>
          <button onClick={()=>handelJoinGroup(item)} className="Button_v_2">Join</button> 
        </div>
      );
    })
  }
</div>

      }
    </div>
  );
};

export default GroupList;
