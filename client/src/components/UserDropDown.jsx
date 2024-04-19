"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { signOutSuccess } from "@/redux/user/userSlice";

export function DropdownMenuCheckboxes() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch=useDispatch()

  const handleSignout=async ()=>{
    try {
      const res = await fetch('/api/user/signout',{
        method:"POST"
      })

      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      } else {
        dispatch(signOutSuccess())

      }
      
    } catch (error) {
      
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={currentUser.profilePicture} alt="profilePicture" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{currentUser.username}</DropdownMenuLabel>
        <DropdownMenuItem>{currentUser.email}</DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={`/dashboard?tab=profile`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4 text-red-500" />
          <span className="text-red-500" onClick={handleSignout}>Log out</span> 
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
