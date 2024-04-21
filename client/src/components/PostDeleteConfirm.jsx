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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
} from "@/redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export function PostDeleteDialog({ deletepost,setUserPosts }) {
  const { currentUser } = useSelector((state) => state.user);

  const handleDeletePost = async () => {
    try {
      const res = await fetch(
        `/api/post/deletepost/${deletepost._id}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== deletepost._id)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='text-red-50 bg-red-600' onClick={handleDeletePost}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
