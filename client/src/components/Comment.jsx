import { ThumbsUp } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const Comment = ({ comment, onLike,onEdit }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [Editing,setEditing]=useState(false)
  const [editedComment,setEditedComment]=useState(comment.content)
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {}
    };
    getUser();
  }, [comment]);

  const handleEdit= async ()=>{
    setEditing(true)
    setEditedComment(comment.content)

  }

  const handleSave =async ()=>{
    try {
      const res = await fetch(`/api/comment/editcomment/${comment._id}`,{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          content: editedComment
        })
      })
      if(res.ok){
        setEditing(false)
        onEdit(comment,editedComment)
      }
      
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex mb-5" key={comment._id}>
      <div className="flex-shrink-0 mr-3">
        <img
          className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <div className="flex justify-between">
          {" "}
          <strong>@{user.username}</strong>{" "}
          <span className="text-xs text-gray-400 justify-end">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {Editing?(
          <>
          <Textarea
          className="w-full p-2 text-gray-700 rounded-md resize-none focus:outline focus:bg-gray-100"
          rows='3'
          defaultValue={comment.content}
          onChange={(e)=>setEditedComment(e.target.value)}
          />
          <div className="flex justify-end gap-3 text-sm pt-2">

          <Button type='button' variant='outline' onClick={handleSave} >Update</Button>
          <Button type='button' variant='outline' onClick={()=>setEditing(false)}>Cancel</Button>
          </div>
          </>

        ):(
          <>
        <p class="text-sm">{comment.content}</p>
        <div className="mt-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-600 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
          >
            <ThumbsUp className="text-sm w-5 h-5" />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
          {currentUser && currentUser._id === comment.userId && (
            <button
              onClick={handleEdit}
              type="button"
              className="text-gray-400 hover:text-blue-500"
            >
              Edit
            </button>
          )}
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
