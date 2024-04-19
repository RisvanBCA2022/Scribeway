import { PencilLineIcon } from "@/assets/Svgs";
import { AlertDestructive } from "@/components/ErrorAlert";
import OAuth from "@/components/OAuth";
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
          </form>
            <OAuth />
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



