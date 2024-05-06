
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import React, { useEffect, useState } from 'react';

const ProfilePicture = ({imgId}) => {
  const [profilePicture, setProfilePicture] = useState('')
  const storage = getStorage()
  const profileRef = ref(storage,imgId)

  useEffect(() => {
    getDownloadURL(profileRef)
    .then((url) => {
      setProfilePicture(url)
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [imgId])

  return (
    <div>
      <img src={profilePicture} alt="" />
    </div>
  );
};

export default ProfilePicture;