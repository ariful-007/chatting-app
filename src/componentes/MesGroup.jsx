

import { getDatabase, push, ref, set, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const MesGroup = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [groupList, setGroupList] = useState([]); 

 // get group list start 
 useEffect(()=>{
   const groupRef = ref(db, "group");
   onValue(groupRef, (snapshot) => {
     const list = [];
     snapshot.forEach((item) => {
      list.push({...item.val(), id: item.key });
     });
     setGroupList(list);
   });
 },[])
 // get group list end 


  return (
    <div id="friend">
      <div className="main">
        <h2>Group List</h2>
      </div>
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
          <button className="Button_v_2">Messagre</button> 
        </div>
      );
    })
  }
    </div>
  );
};

export default MesGroup;
