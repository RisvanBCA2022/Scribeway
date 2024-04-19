import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "@/firebase";
import toast from "react-hot-toast";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashBoardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile,setImageFile]=useState(null)
  const [imageFileUrl,setImageFileUrl]=useState(null)
  const [imageFIleUploadProgress,setImageFIleUploadProgress]=useState(null)
  const [imageFIleUploadError,setImageFIleUploadError]=useState(null)

  const filePickerRef=useRef()

  const handleImageChange=(e)=>{

    const file=e.target.files[0]
    if(file){
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }


  }

useEffect(()=>{
  if(imageFile){
    uploadImage()
  }

},[imageFile])

const uploadImage = async ()=>{
  const storage = getStorage(app)
  const fileName = new Date().getTime() + imageFile.name;
  const storageRef = ref(storage,fileName)

  const uploadTask = uploadBytesResumable(storageRef,imageFile)
  uploadTask.on(
    'state_changed',
    (snapshot)=>{
      const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
      setImageFIleUploadProgress(progress.toFixed(0))

    },
    (error)=>{
      setImageFIleUploadError('Could not upload image (File must be less than 2MB)')
      setImageFIleUploadProgress(null)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
        setImageFileUrl(downloadUrl)
      })
    }
  )
  if(imageFIleUploadError){
    toast.error(imageFIleUploadError)
  }
}

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>filePickerRef.current.click()}>
          {imageFIleUploadProgress && (
            <CircularProgressbar value={imageFIleUploadProgress || 0} text={`${imageFIleUploadProgress}%`}
            strokeWidth={5}
            styles={{
              root:{
                height:'100%',
                height: '100%',
                position: 'absolute',
                top:0,
                left:0,
                
              },
              path:{
                stroke:`rgba(62,152,199,${imageFIleUploadProgress/100})`
              }
            }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${imageFIleUploadProgress && imageFIleUploadProgress < 100 && 'opacity-60'}`}
          />
        </div>

        <Input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <Input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <Input type="password" id="password" placeholder="password" />
        <Button type="submit" className="bg-gradient-to-r from-sky-600 via-sky-400 to-sky-600" >
          Update
        </Button>
      </form>
      <div className="text-orange-700 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashBoardProfile;
