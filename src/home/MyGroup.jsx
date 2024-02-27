import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";

const MyGroup = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [groupList, setGroupList] = useState([]);

  const groupRef = ref(db, "group");
  useEffect(() => {
    onValue(groupRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminId) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setGroupList(list);
    });
  }, []);

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
                  <h1>{item.groupName[0]}</h1>
                </div>
                <div>
                  <h1>{item.adminName}</h1>
                  <p className=" text-base font-bold text-black">
                    {item.gropIntro}
                  </p>
                </div>
              </div>
              <button className=" Button_v_2">Info</button>
              <button className=" Button_v_3">Request</button>
              <button className=" Button_v_2">Delete</button>
            </div>
          );
        })
      }
      
    </div>
  );
};

export default MyGroup;
