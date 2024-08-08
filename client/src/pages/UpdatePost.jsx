import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "@/actions/postActions";
import { AlertDestructive } from "@/components/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "@/components/layout/Loader";

const UpdatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { post, loading, error } = useSelector((state) => state.post);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(post);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPost(postId));
        setDataLoading(false);
      } catch (err) {
        setDataLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setFormData({ ...post });
    }
  }, [post]);

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please select an Image");
      return;
    }

    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);

    try {
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
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUploadProgress(null);
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: downloadUrl,
          }));
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updatePost({ postId: formData._id, userId: currentUser._id, formData })
      ).unwrap();
      navigate(`/posts/${formData.slug}`);
    } catch (err) {
      setPublishError(err.message || "Failed to update post");
    }
  };
  if (dataLoading) {
    return <Loader />;
  }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>

      {error && (
        <AlertDestructive variant="error" title="Error" description={error} />
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <Input
              type="text"
              placeholder="Title"
              required
              id="title"
              value={formData.title || post.title || ""}
              className="flex-1"
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  title: e.target.value,
                }))
              }
            />
            <Select
              onValueChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  category: e,
                }))
              }
              defaultValue={formData.category || post.category || ""}
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
            <Button
              onClick={handleUploadImage}
              type="button"
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-9 h-9">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {imageUploadError && (
            <AlertDestructive
              variant="error"
              title="Error"
              description={imageUploadError}
            />
          )}
          {(formData.image || post.image) && (
            <img
              src={formData.image || post.image}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          )}
          <ReactQuill
            theme="snow"
            value={formData.content || post.content || ""}
            placeholder="Write something..."
            className="h-72 mb-12 dark:text-white"
            required
            onChange={(value) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                content: value,
              }));
            }}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update post"}
          </Button>
          {publishError && (
            <AlertDestructive
              variant="error"
              description={publishError}
              title="Error"
            />
          )}
        </form>
      )}
    </div>
  );
};

export default UpdatePost;
