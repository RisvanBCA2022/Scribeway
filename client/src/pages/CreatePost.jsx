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

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

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

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1 bg-gray-800"
          />
          <Select>
            <SelectTrigger className="w-[180px] bg-gray-800">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Technology</SelectLabel>
                <SelectItem value="apple">JavaScript</SelectItem>
                <SelectItem value="banana">React.js</SelectItem>
                <SelectItem value="blueberry">Next.js</SelectItem>
                <SelectItem value="grapes">Nodejs</SelectItem>
                <SelectItem value="pineapple">MongoDB</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            id="picture"
            type="file"
            className="dark:bg-gray-800"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button onClick={handleUploadImage} type="button" disabled={imageUploadProgress}>
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
        />
        <Button type="submit">Publish</Button>
      </form>
    </div>
  );
};

export default CreatePost;
