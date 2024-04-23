import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { useSelector } from "react-redux";
import { DropdownMenu } from "./ui/dropdown-menu";
import { DropdownMenuCheckboxes } from "./UserDropDown";
import { Rss } from "lucide-react";

const Navbar = () => {
  const {currentUser}=useSelector((state)=>state.user)
  const path=useLocation().pathname
  const location = useLocation()
  const navigate=useNavigate()

  const [searchTerm,setSearchTerm]=useState('')
console.log(searchTerm);
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }

  },[location.search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  

  return (
    <header className="flex items-center justify-around h-16 px-4 md:px-6 border-b border-gray-300 dark:border-gray-800">
      <Link className="flex items-center justify-center gap-2 lg:text-lg md:text-lg text-xs font-semibold" to="/">
      {/* <Rss /> */}
        <span className="px-2 py-1 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-950 rounded-lg text-white dark:from-slate-100 dark:via-slate-300 dark:to-slate-400 dark:text-slate-800">
          Sribeways
        </span>{" "}
      </Link>
      <div className="w-[200px]">
      <form className="flex-1 justify-start relative"  onSubmit={handleSubmit}>
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
          <Input
            className="pl-10 pr-4 py-2 lg:w-96 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 w-full max-w-[200px] md:max-w-[300px]"
            placeholder="Search..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        
        <nav className="hidden md:flex items-center gap-4">
          <Link
            className={`text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 ${path==='/'?'font-semibold':''}`}
            to="/"
          >
            Home
          </Link>
          {/* <Link
            className={`text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 ${path==='/about'?'font-semibold':''}`}
            to="/about"
          >
            About
          </Link>
          <Link
            className={`text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 ${path==='/projects'?'font-semibold':''}`}
            to="/projects"
          >
            Projects
          </Link> */}
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />

          {
            currentUser?(
              <DropdownMenuCheckboxes />
            ):(
              
       <Button asChild className='text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center'>
        <Link to="/sign-up">
          Sign Up
        </Link>
       </Button>
            )
          }
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" size="icon" variant="outline">
              <MenuIcon className="w-6 h-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                to="/"
              >
                Home
              </Link>
              {/* <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                to="/about"
              >
                About
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                to="/projects"
              >
                Projects
              </Link> */}
              
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
