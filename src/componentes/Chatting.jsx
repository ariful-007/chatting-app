import React, { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import { BsEmojiSmile, BsSnapchat } from "react-icons/bs";
import { FaImages } from "react-icons/fa";
import { LuCamera } from "react-icons/lu";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { getStorage, ref as sref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const img ="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg";

const Chatting = () => {
  const storage = getStorage();
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const activeChatSlice = useSelector((state) => state.activeCahtSlice);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  console.log(messageList);


  // handel messages start
  const handelMessgesSend = () => {
    if (activeChatSlice.active.status == "single") {
      set(push(ref(db, "singleMessage")), {
        whoSenderId: data.uid,
        whoSenderName: data.displayName,
        whoReceverId: activeChatSlice.active.id,
        whoReceverName: activeChatSlice.active.name,
        message: message,
        date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}, ${
          new Date().getHours()%12||12}:${new Date().getMinutes()} ${new Date().getHours()>=12? "PM" : "AM"}`,
      })
        .then(() => {
          console.log("geche");
          setMessage("");
        })
        .catch(() => {
          console.log("jai nai");
        });
    } else {
      console.log("group");
    }
  };

  useEffect(() => {
    onValue(ref(db, "singleMessage"), (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whoSenderId == data.uid &&
            item.val().whoReceverId == activeChatSlice.active.id) ||
          (item.val().whoReceverId == data.uid && item.val().whoSenderId == activeChatSlice.active.id)
        ) {
          list.push(item.val());
        }
      });
      setMessageList(list);
    });
  },[activeChatSlice.active.id]);
  // handel messages end

  // handel image uploads start
  const handelImage=(e)=>{
const storageRef = sref(storage, e.target.files[0].name);
const uploadTask = uploadBytesResumable(storageRef, e.target.files[0].name);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    console.log(error);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      set(push(ref(db, "singleMessage")), {
        whoSenderId: data.uid,
        whoSenderName: data.displayName,
        whoReceverId: activeChatSlice.active.id,
        whoReceverName: activeChatSlice.active.name,
        img: downloadURL,
        date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}, ${
          new Date().getHours()%12||12}:${new Date().getMinutes()} ${new Date().getHours()>=12? "PM" : "AM"}`,
      })
    });
  }
);
  }
  // handel image uploads end
  return (
    <div className=" relative h-[605px] overflow-y-scroll rounded-lg px-6 border-2 border-sky-400 mt-1">
      {/* =====identy start======= */}
      <div className=" flex gap-5 items-center bg-white rounded-md p-2 shadow-sm sticky top-0 left-0 z-10">
        <div className=" w-[70px] h-[70px] overflow-hidden rounded-full bg-slate-600">
          <img src="" alt="" />
        </div>
        <div>
          <h1 className=" font-bold text-black capitalize text-xl">
            {activeChatSlice.active?.name}
          </h1>
          <p>Online</p>
        </div>
      </div>
      {/* =====identy end======= */}

      {
        activeChatSlice.active.status == "single"?
        (
          messageList.map((item,i)=>{
            return(
              item.whoSenderId == data.uid ?
              (
                item.message?
                <div key={i} className=" text-right my-5">
                <div className=" inline-block px-3 py-1 rounded-md bg-sky-400 mt-2">
                  <p className=" text-black text-left">{item.message}</p>
                </div>
                <p className=" text-gray-400">{item.date}</p>
                </div>
                :
                <div className=" text-right my-5">
                <div className=" inline-block p-1  rounded-md bg-sky-400 mt-2">
                  <ModalImage small={item.img} large={item.img} />
                </div>
                <p className=" text-gray-400">{item.date}</p>
                </div>
              )
            :
            (
              item.message?
              <div key={i} className=" text-left">
              <div className=" inline-block px-3 py-1 rounded-md bg-slate-300 mt-2">
                <p className=" text-left">
                {item.message} 
                </p>
              </div>
              <p className=" text-gray-400">{item.date}</p>
            </div>
            :
            <div className=" text-right my-5">
                <div className=" inline-block p-1  rounded-md bg-slate-300 mt-2">
                  <ModalImage small={item.img} large={item.img} />
                </div>
                <p className=" text-gray-400">{item.date}</p>
            </div>

            )
            

            )
          })
        )
        :
        <h1>Group</h1>
      }


      {/* =======================input start=============================== */}
      <div className=" w-full flex justify-between items-center sticky left-0 bottom-0 gap-2 bg-white">
        <div className=" w-full flex justify-between bg-gray-200 rounded-lg gap-4 items-center">
          <div className=" w-full">
            <input
              onChange={(e)=>setMessage(e.target.value)}
              type="text"
              placeholder="type a message"
              className="input border border-sky-400 px-3 py-1 rounded-lg outline-none w-full"
            />
          </div>
          <div className=" flex gap-2 items-center">
            <button>
              <BsEmojiSmile className=" text-[25px] text-black " />
            </button>
            <button>
              <MdOutlineKeyboardVoice className=" text-2xl text-black " />
            </button>
            <label>
              <input onClick={handelImage}  type="file" className="hidden" />
              <FaImages className=" text-2xl text-black mr-2" />
            </label>
          </div>
        </div>
        <div>
          <button
            onClick={handelMessgesSend}
            className=" bg-sky-500 py-1 px-4 rounded font-bold text-base"
          >
            Send
          </button>
        </div>
      </div>

      {/* =======================input end=============================== */}
    </div>
  );
};

export default Chatting;
