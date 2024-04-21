import moment from "moment";
import React, { useEffect, useState } from "react";

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});

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
  return (
    <div className="flex mb-5" key={comment._id}>
      <div className="flex-shrink-0 mr-3">
        <img
          class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover"
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
        <p class="text-sm">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
