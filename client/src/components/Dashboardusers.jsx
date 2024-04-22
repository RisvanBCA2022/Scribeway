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

const Dashboardusers = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchusers();
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

  return (
    <div className="overflow-x-auto w-full p-3 m-4 rounded-md lg:w-[80%] lg:p-10 bg-gray-800">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Date Created</TableHead>
                <TableHead className="text-left">User Image</TableHead>
                <TableHead className="text-left">Username</TableHead>
                <TableHead className="text-left">Email</TableHead>
                <TableHead className="text-center">Admin</TableHead>
                <TableHead className="text-center">Delete</TableHead>
              </TableRow>
            </TableHeader>
            {users.map((user) => (
              <TableBody key={user._id}>
                <TableRow className=" dark:border-gray-700">
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={user.profilePicture}
                        alt={user.username}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <ShieldCheck className="text-green-400" />
                    ) : (
                      <X className="text-red-400" />
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <UserDeleteDialog deleteuser={user} setUsers={setUsers} />
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

export default Dashboardusers;
