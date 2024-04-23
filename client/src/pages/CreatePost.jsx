import { AlertDestructive } from "@/components/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError,setPublishError]=useState(null)

  const navigate=useNavigate()

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an Image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);

      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload Failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
      const res = await fetch('/api/post/create',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if(!res.ok){
        setPublishError(data.message)
        return
      }
     
      if(res.ok){
        setPublishError(null)
        navigate(`/posts/${data.slug}`)
      }
      
    } catch (error) {
      setPublishError('Something Went Wrong')
    }

  }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e)=>setFormData({...formData,title:e.target.value})}
          />
         <Select 
  onValueChange={(e)=>setFormData({...formData, category: e})}
>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a category" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="javascript">JavaScript</SelectItem>
      <SelectItem value="reactjs">React.js</SelectItem>
      <SelectItem value="nextjs">Next.js</SelectItem>
      <SelectItem value="nodejs">Nodejs</SelectItem>
      <SelectItem value="mongodb">MongoDB</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select> 
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            id="picture"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button onClick={handleUploadImage} type="button" disabled={imageUploadProgress} className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
            {
              imageUploadProgress?
              <div className="w-9 h-9">
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
              </div>:'Upload Image'
            }
          </Button>
        </div>
        {imageUploadError && (
        <AlertDestructive variant="error" title="Error" description={imageUploadError} />
        )}

        {formData.image && (
          <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />
          )}

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12 dark:text-whtie"
          required
          onChange={(value)=>{
            setFormData({...formData,content:value})
          }}
        />
        <Button type="submit">Publish</Button>
        {
          publishError && <AlertDestructive variant='error' description={publishError} title='Error' />
          
        }
      </form>
    </div>
  );
};

export default CreatePost;
