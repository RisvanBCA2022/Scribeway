import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleSubmit=async ()=>{

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
        <form className="border border-blue-900 rounded-md p-3" onSubmit={handleSubmit}>
          <Textarea
            placeholder="Type your message here."
            maxlength="200"
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
        </form>
      )}
    </div>
  );
}

export default CommentSection;
