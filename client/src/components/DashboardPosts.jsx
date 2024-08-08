import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Link } from "react-router-dom";
import { PostDeleteDialog } from "./PostDeleteConfirm";
import {  addPosts } from "../redux/dashboard/dashboardSlice";
import { fetchUserPosts } from "../actions/postActions";

const DashboardPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { posts, loading, error, hasMore } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.isAdmin) {
      dispatch(fetchUserPosts(currentUser._id));
    }
  }, [dispatch, currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(addPosts(data.posts));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="overflow-x-auto w-full p-3 lg:w-[80%] lg:p-10">
      {currentUser.isAdmin && posts.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Date Updated</TableHead>
                <TableHead className="text-left">Post Image</TableHead>
                <TableHead className="text-left">Post Title</TableHead>
                <TableHead className="text-left">Category</TableHead>
                <TableHead className="text-center">Delete</TableHead>
                <TableHead className="text-center">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id} className="dark:border-gray-700">
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
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
                    <Link
                      className="font-medium text-gray-800 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell className="text-center">
                    <PostDeleteDialog deletepost={post} userPosts={posts} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                      size="sm"
                      variant="secondary"
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {hasMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal self-center text-sm py-7"
            >
              {loading ? "Loading..." : "Show More"}
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet</p>
      )}
    </div>
  );
};

export default DashboardPosts;
