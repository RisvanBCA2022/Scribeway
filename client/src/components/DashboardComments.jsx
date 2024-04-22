import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { PostDeleteDialog } from "./PostDeleteConfirm";
import { Avatar, AvatarImage } from "./ui/avatar";
import { ShieldCheck, X } from "lucide-react";
import { UserDeleteDialog } from "./UserDeleteConfirm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const DashboardComments = () => {
    const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
  console.log(comments);

  return (
    <div className="overflow-x-auto w-full p-3 m-4 rounded-md lg:w-[80%] lg:p-10 bg-gray-800">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Date Created</TableHead>
                <TableHead className="text-left">Comment content</TableHead>
                <TableHead className="text-left">Number of likes</TableHead>
                <TableHead className="text-left">PostId</TableHead>
                <TableHead className="text-center">UserId</TableHead>
                <TableHead className="text-center">Delete</TableHead>
              </TableRow>
            </TableHeader>
            {comments.map((comment) => (
              <TableBody key={comment._id}>
                <TableRow className=" dark:border-gray-700">
                  <TableCell>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                  {comment.content}
                  </TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                  <TableCell>{comment.postId}</TableCell>
                  <TableCell>
                  {comment.userId}
                  </TableCell>

                  <TableCell className="text-center">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                        //   onClick={()=>onDelete(comment._id)}
                          type="button"
                          className="text-red-400 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your post and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="text-red-50 bg-red-600"
                            onClick={() => handleDelete(comment._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>{" "}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal self-center text-sm py-7"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet</p>
      )}
    </div>
  );
};

export default DashboardComments;
