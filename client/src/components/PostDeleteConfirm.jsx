import { fetchUserPosts } from "@/actions/postActions";
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
import { useDispatch, useSelector } from "react-redux";

export function PostDeleteDialog({ deletepost,setUserPosts }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeletePost = async () => {
    try {
      const res = await fetch(
        `/api/post/deletepost/${deletepost._id}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      dispatch(fetchUserPosts(currentUser._id));
      if (!res.ok) {
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
