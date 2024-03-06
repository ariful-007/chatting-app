import React from "react";
import ModalImage from "react-modal-image";
import { BsEmojiSmile } from "react-icons/bs";
import { LuCamera } from "react-icons/lu";

const img = "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg";

const Chatting = () => {
  return (
    <div className=" relative h-[605px] overflow-y-scroll rounded-lg px-6 border-2 border-sky-400 mt-1">
      {/* =====identy start======= */}
      <div className=" flex gap-5 items-center bg-white rounded-md p-2 shadow-sm sticky top-0 left-0 z-10">
        <div className=" w-[70px] h-[70px] overflow-hidden rounded-full bg-slate-600">
          <img src="" alt="" />
        </div>
        <div>
          <h1 className=" font-bold text-black capitalize text-xl">arif</h1>
          <p>Online</p>
        </div>
      </div>
      {/* =====identy end======= */}
      {/* =====riceve message start======= */}
      <div className=" text-left">
        <div className=" inline-block px-3 py-1 rounded-md bg-slate-300 mt-2">
          <p className=" text-left">
            hello world Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Explicabo periam maxime magnam incidunt quia c tempore
            eveniet!
          </p>
        </div>
        <p className=" text-gray-400">12:45pm</p>
      </div>

      {/* =====riceve message end======= */}
      {/* =====send message start======= */}
      <div className=" text-right my-5">
        <div className=" inline-block px-3 py-1 rounded-md bg-sky-400 mt-2">
          <p className=" text-black text-left">
            hello Ex eveniet sit, sapiente voluptatibus eius fugiat architecto
            voluptate, laudantium, soluta doloremque molestiae fugit
            perspiciatis?
          </p>
        </div>
        <p className=" text-gray-400">12:45pm</p>
      </div>
      {/* =====send message end======= */}

      {/* =====image recive message start======= */}
      <div className=" text-left">
        <div className=" inline-block p-1 rounded-md bg-slate-300 mt-2">
          <ModalImage small={img} large={img}  />;
        </div>
        <p className=" text-gray-400">12:45pm</p>
      </div>

      {/* =====image recive message end======= */}
      {/* =====image send message start======= */}
      <div className=" text-right my-5">
        <div className=" inline-block p-1  rounded-md bg-sky-400 mt-2">
          <ModalImage small={img} large={img}  />;
        </div>
        <p className=" text-gray-400">12:45pm</p>
      </div>
      {/* =====image send message end======= */}


      {/* =====auido recive message start======= */}
      <div className=" text-left">
        <div className=" inline-block p-1 rounded-md bg-slate-300 mt-2">
          <audio controls/>
        </div>
        <p className=" text-gray-400">12:45pm</p>
      </div>

      {/* =====auido recive message end======= */}
      {/* =====auido send message start======= */}
      <div className=" text-right my-5">
        <div className=" inline-block p-1  rounded-md bg-sky-400 mt-2">
        <audio controls/>
        </div>
        <p className=" text-gray-400">12:45pm</p>
      </div>
      {/* =====auido send message end======= */}

       {/* =====video recive message start======= */}
       <div className=" text-left">
        <div className=" inline-block p-1 rounded-md bg-slate-300 mt-2">
          <video controls/>
        </div>
        <p className=" text-gray-400">12:45pm</p>
      </div>

      {/* =====video recive message end======= */}
      {/* =====video send message start======= */}
      <div className=" text-right my-5">
        <div className=" inline-block p-1  rounded-md bg-sky-400 mt-2">
        <video controls/>
        </div>
        <p className=" text-gray-400">12:45pm</p>
      </div>
      {/* =====video send message end======= */}




      {/* =======================input start=============================== */}
      <div className=" w-full flex justify-between items-center sticky left-0 bottom-0 gap-2 bg-white">
        <div className=" w-full flex justify-between bg-gray-200 rounded-lg gap-4 items-center">
          <div className=" w-full">
          <input type="text" placeholder="type a message" className="input border border-sky-400 px-3 py-1 rounded-lg outline-none w-full" />
          </div>
          <div className=" flex gap-2 items-center">
          <button><BsEmojiSmile className=" text-[27px] text-sky-400 " /></button>
          <button><LuCamera className=" text-3xl text-sky-400 mr-2" /></button>
        </div>
        </div>
        <div>
          <button className=" bg-sky-500 py-1 px-4 rounded font-bold text-base">Send</button>
        </div>
      </div>

       {/* =======================input end=============================== */}


    </div>
  );
};

export default Chatting;
