import {  getDatabase, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';


const GroupList = () => {
  const db = getDatabase()
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const [show, setShow]= useState(false)
  const [groupName, setGroupName]= useState('')
  const [gropIntro, setGropIntro]= useState('')
  const [groupNameError, setGroupNameError] = useState('')
  const [gropIntroError, setGropIntroError] = useState('')

  const heandelGroupName =(e)=>{
    setGroupName(e.target.value)
    setGroupNameError('')
  }
  const heandelGropIntro =(e)=>{
    setGropIntro(e.target.value)
    setGropIntroError('')
  }

  const heandelCreateGroup = ()=>{
    if(groupName== ''){
      setGroupNameError('Group name is required')
    }
    else if(gropIntro==''){
      setGroupNameError('Group name must be at least 3 characters')
    }
    else{

      set(push(ref(db, "group")),{
        groupName: groupName,
        gropIntro: gropIntro,
        adminName: data.displayName,
        adminId: data.uid
      }).then(()=>{
        toast.success("Group Created")
      setShow(false)
      setGroupName('')
      setGropIntro('')
      })
    }
  }


  return (
    <div id="all-item">
      <div className="main">
        <h2>Group List</h2>
        <button onClick={()=> setShow(!show)} className="Button_v_3">{show? "Cencel":"Create group"}</button>
      </div>
      {
        show?
        <div className=" p-4 bg-blue-500 rounded-lg">
        <input onChange={heandelGroupName} type="text" placeholder="Group Name"  className=" outline-none p-2 w-full rounded-lg py-1"/>
        <p className=" text-red-500">{groupNameError}</p>
        <input onChange={heandelGropIntro} type="text" placeholder="Group Intro" className=" outline-none p-2 w-full rounded-lg py-1 mt-3"/>
        <p className=" text-red-500">{gropIntroError}</p>
        <button onClick={heandelCreateGroup} className="Button_v_3 w-full">Create</button>
      </div>
      :
      <div className="flex justify-between items-center p-2">
        <div className=" flex gap-5">
          <div className="img">
            <img src="" alt="" />
          </div>
          <div>
            <h1>Group Name</h1>
            <p>Hi Guys,Wassup!</p>
          </div>
        </div>
        <button className=" Button_v_2">join</button>
      </div>

      }
    </div>
  );
};

export default GroupList;
