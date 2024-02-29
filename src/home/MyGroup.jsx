import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";

const MyGroup = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [groupList, setGroupList] = useState([]);

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
              <button className=" Button_v_2">Info</button>
              <button className=" Button_v_3">Request</button>
              <button onClick={()=>handelGroupDelete(item)} className=" Button_v_2">Delete</button>
            </div>
          );
        })
      }
      
    </div>
  );
};

export default MyGroup;
