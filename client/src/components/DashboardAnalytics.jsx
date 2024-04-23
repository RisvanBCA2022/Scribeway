import { MessagesSquare, MoveUp, Rss, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const DashboardAnalytics = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  console.log(comments, totalComments, lastMonthComments);

  return (
    <div className="p-3 md:mx-auto pt-16">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-lg">
          <div className="flex justify-between">
            <div>
              <h1 className="text-gray-500 text-md uppercase">Total Users</h1>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <Users className="w-10 h-10shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <MoveUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-lg">
          <div className="flex justify-between">
            <div>
              <h1 className="text-gray-500 text-md uppercase">
                Total Comments
              </h1>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <MessagesSquare className="w-10 h-10shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <MoveUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-lg">
          <div className="flex justify-between">
            <div>
              <h1 className="text-gray-500 text-md uppercase">Total Posts</h1>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <Rss className="w-10 h-10shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <MoveUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Uers</h1>
            <Link
              to={`/dashboard?tab=users`}
              href=""
              className="h-10 hover:bg-indigo-700 hover:text-white text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded flex items-center"
            >
              <span>See All</span>
              <svg
                class="w-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User image</TableHead>
                <TableHead>Username</TableHead>
              </TableRow>
            </TableHeader>
            {users.map((user) => (
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <img
                      src={user.profilePicture}
                      alt=""
                      className="w-10 h-10 rounded-full bg-gray-500"
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent comments</h1>
            <Link
              to={`/dashboard?tab=comments`}
              href=""
              className="h-10 hover:bg-indigo-700 hover:text-white text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded flex items-center"
            >
              <span>See All</span>
              <svg
                class="w-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>comments content</TableHead>
                <TableHead>likes</TableHead>
              </TableRow>
            </TableHeader>
            {comments.map((comment) => (
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <p className="line-clamp-2">{comment.content}</p>
                  </TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Link
              to={`/dashboard?tab=posts`}
              href=""
              className="h-10 hover:bg-indigo-700 hover:text-white text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded flex items-center"
            >
              <span>See All</span>
              <svg
                class="w-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post image</TableHead>
                <TableHead>Post Title</TableHead>
                <TableHead>Post category</TableHead>
              </TableRow>
            </TableHeader>
            {posts.map((post) => (
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <img
                      src={post.image}
                      alt=""
                      className="w-14 h-10 rounded-md bg-gray-500"
                    />
                  </TableCell>
                  <TableCell className="w-96">{post.title}</TableCell>
                  <TableCell className="w-5">{post.category}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
