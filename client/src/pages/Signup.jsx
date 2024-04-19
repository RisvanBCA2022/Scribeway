import { AlertDestructive } from "@/components/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()

  const handleRegister = async (e) => {
    const formdata={username,email,password}
      e.preventDefault();
      if(!formdata.username || formdata.username==="" || !formdata.email || formdata.email==="" || !formdata.password || formdata.password===""){
        return toast.error("Please fill out all fields")
      }
      try {
        setLoading(true)
        const res = await fetch('/api/auth/signup',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(formdata)
        })

        const data = await res.json()
        console.log(data);

        if(data.success === false){
          return toast.error(data.message)
        }
        // setUsername('')
        // setEmail('')
        // setPassword('')
        if(res.ok){
          navigate('/sign-in')
          setUsername('')
          setEmail('')
          setPassword('')
        }
        
      } catch (error) {
        toast.error(error.message)
      } finally{
        setLoading(false)
      }

  };
  return (
    <div className="min-h-[100vh]">
    <div className="flex max-h-screen items-center justify-center bg-gray-100 dark:bg-slate-950 p-4 mt-16">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <PencilLineIcon className="h-12 w-12 dark:text-slate-50" />
        </div>
        <div className="rounded-md bg-white dark:bg-slate-900 p-8 shadow-sm">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-gray-50">
            Join Scribeway
          </h2>
          <form
            action="#"
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={handleRegister}
          >
            <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-6">
                <Input
                  className="rounded-t-md"
                  id="username"
                  placeholder="Username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="pb-6">
                <Input
                  className="rounded-t-md"
                  id="email-address"
                  placeholder="Email address"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  className="rounded-t-md"
                  id="password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link className="font-medium text-indigo-600 " to="">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div>
              <Button className="w-full bg-indigo-600 dark:text-white" disabled={loading}>
                {loading?(
                  <span>
                  <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                  </svg>
                  Loading...
                  </span>
                ):'Sign Up'}
              </Button>
            </div>
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300" />
              <span className="mx-4 flex-shrink text-sm text-gray-600">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-300" />
            </div>
            <div className="flex justify-center space-x-4">
              <Button className="flex w-full items-center justify-center border-solid border-2 border-zinc-500 bg-white dark:bg-slate-600 dark:text-white text-gray-700 hover:bg-gray-50">
                <ChromeIcon className="h-5 w-5 text-red-500" />
                <span className="ml-2">Google</span>
              </Button>
            </div>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
            Sign In
            </Link>

          </div>
        </div>
      </div>
    </div>
    </div>

  );
}

function PencilLineIcon(props) {
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      <path d="m15 5 3 3" />
    </svg>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path
        fill="#fbc02d"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#e53935"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4caf50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1565c0"
        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  );
}

function GithubIcon(props) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
