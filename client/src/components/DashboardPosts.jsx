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
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const DashboardPosts = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  return (
    <div className="overflow-x-auto w-full">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Date Updated</TableHead>
              <TableHead className="text-left">Post Image</TableHead>
              <TableHead className="text-left">Post Title</TableHead>
              <TableHead className="text-left">Category</TableHead>
              <TableHead className="text-center">Delete</TableHead>
              <TableHead className="text-center">EDIT</TableHead>
            </TableRow>
          </TableHeader>
          {userPosts.map((post) => (
            <TableBody key={post.id}>
              <TableRow className=' dark:border-gray-700'>
                <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                    <Link to={`/posts/${post.slug}`}>
                  <img
                    alt={post.title}
                    className="h-10 w-20 object-cover bg-gray-500"
                    height="40"
                    src={post.image}
                    style={{
                      aspectRatio: "60/40",
                      objectFit: "cover",
                    }}
                    width="60"
                  />
                    </Link>
                </TableCell>
                <TableCell>
                <Link className="font-medium text-gray-800 dark:text-white" to={`/post/${post.slug}`}>
                {post.title}
                </Link>
                </TableCell>
                <TableCell>
                    {post.category}
                </TableCell>
                <TableCell className="text-center">
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Link className="text-teal-500 hover:underline" to={`/update-post/${post._id}`} size="sm" variant="secondary">
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      ) : (
        <p>You have no posts yet</p>
      )}
    </div>
  );
};

export default DashboardPosts;
