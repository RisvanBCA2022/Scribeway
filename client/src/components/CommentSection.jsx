import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { AlertDestructive } from "./ErrorAlert";
import Comment from "./Comment";


function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getpostcomments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        }
      } catch (error) {}
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment,editedContent)=>{
    setComments(
      comments.map((c)=>c._id === comment._id ? {...c, content: editedContent}:c)
    )
  }

  const handleDelete = async (commentId)=>{
    try {
      if(!currentUser){
        navigate('/sign-in')
        return;
      }
      const res = await fetch(`/api/comment/deletecomment/${commentId}`,{
        method: 'DELETE'
      })
      if(res.ok){
        const data = await res.json()
      setComments(comments.filter((comment)=>comment._id !== commentId))
      }
      
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="max-w-2xl w-full mx-auto p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p> SIgned in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link to={"/sign-in"} className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form className="border rounded-md p-3" onSubmit={handleSubmit}>
          <Textarea
            placeholder="Type your message here."
            maxLength="200"
            rows="3"
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-grey-500 text-xs">
              {200 - comment.length} Characters remaining
            </p>
            <Button variant="outline" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <AlertDestructive
              title="Error"
              description={commentError}
              variant="error"
            />
          )}
        </form>
      )}
      <>
        <div className="antialiased mx-auto max-w-screen-sm mt-4">
          <h3 className="mb-4 text-lg font-semibold dark:text-white text-gray-900">
            Comments {comments.length}
          </h3>

          <div className="space-y-4"></div>
          {comments &&
            comments.map((comment, i) => <Comment key={comment._id}  onLike={handleLike} comment={comment} onEdit={handleEdit} onDelete={handleDelete} />)}
        </div>
      </>
    </div>
  );
}

export default CommentSection;
