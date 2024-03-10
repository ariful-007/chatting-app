import { Link, json, useNavigate } from "react-router-dom";
import {
  IoHomeSharp,
  IoChatboxEllipses,
  IoNotifications,
  IoLogOut,
} from "react-icons/io5";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userLoginInfo } from "../slice/userSlice";
import { FaCloudUploadAlt } from "react-icons/fa";
import { createRef, useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { toast } from "react-toastify";

const Navbar = () => {
  const auth = getAuth();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storage = getStorage();

  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const heandelLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        dispatch(userLoginInfo(null));
        localStorage.removeItem("user");
      })
      .catch((error) => {
      });
  };

  // react coppare start
  const headalCopperProfile = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    console.log(files);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (auth.currentUser) {
      if (typeof cropperRef.current?.cropper !== "undefined") {
        setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        console.log(cropData);
        const storageRef = ref(storage, auth.currentUser.uid);
        console.log(storageRef);
        const message4 = cropperRef.current?.cropper
          .getCroppedCanvas()
          .toDataURL();
          uploadString(storageRef, message4, "data_url").then((snapshot) => {
          getDownloadURL(storageRef).then((downloadURL) => {
            updateProfile(auth.currentUser,{
              photoURL: downloadURL
            })
            dispatch(userLoginInfo({ ...data, photoURL: downloadURL }));
            localStorage.setItem(
              "user",
              JSON.stringify({ ...data, photoURL: downloadURL })
            );
            setShowModal(false);
          });
        });
      }
    } else {
      toast.error("Please login first");
    }
  };
  getCropData();

  // react coppare end

  return (
    <nav id="navbar" className="bg-gray-700 py-2 px-4">
      <div className="main_navbar">
        <div className="navbar_img">
          <div className="navbar_img_round relative group">
            {showModal ? (
              <h1 className="displayImg group-hover:opacity-0">
                {data?.displayName[0]}
              </h1>
            ) : (
              <img src={data?.photoURL} alt="" />
            )}

            <div
              onClick={() => setShowModal(true)}
              className="overlay hidden group-hover:block"
            >
              <FaCloudUploadAlt />
            </div>
          </div>
          <h1>{data?.displayName}</h1>
        </div>
        <div className="nav_icon_menu">
          <div className="nav_box">
            <Link to="/home" className="nav_icon">
              {" "}
              <IoHomeSharp />{" "}
            </Link>
          </div>
          <div className="nav_box">
            <Link to="/chat" className="nav_icon">
              {" "}
              <IoChatboxEllipses />{" "}
            </Link>
          </div>
          <div className="nav_box">
            <Link to="/notification" className="nav_icon">
              {" "}
              <IoNotifications />{" "}
            </Link>
          </div>
          <div className="nav_box">
            <Link onClick={heandelLogout} to="/login" className="nav_icon">
              {" "}
              <IoLogOut />
            </Link>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="profileImages">
            <h1>Update Your Profile Picture </h1>
            <input
              onChange={headalCopperProfile}
              className=" my-4"
              type="file"
            />
            {image && (
              <div className=" w-[150px] h-[150px] mx-auto overflow-hidden rounded-full">
                <div className="img-preview w-full h-full" />
              </div>
            )}

            {image && (
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
              />
            )}
            <div className=" flex gap-7">
              <button onClick={getCropData} className="Button_v_2 py-2 px-8">
                Uplode
              </button>
              <button onClick={closeModal} className="Button_v_3 py-2 px-8">
                cansel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
