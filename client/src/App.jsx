import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Header from "./components/Navbar"
import { ThemeProvider } from "./components/themeprovider"
import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import AdminPrivateRoute from "./components/AdminPrivateRoute"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"
import PostPage from "./pages/PostPage"
import ScrollTop from "./components/Scrolltotop"
import Search from "./pages/Search"
import { useEffect } from "react"
import { GlobalDebug } from "./lib/remove-consoles"


function App() {
  useEffect(() => {
    ( import.meta.env.NODE_ENV === "production" ||
    import.meta.env.REACT_APP_ENV === "STAGING") &&
      GlobalDebug(false);
  }, []);

  return (
    <ThemeProvider>
    <BrowserRouter>
      <ScrollTop />
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/search" element={<Search />} />

      <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<AdminPrivateRoute />}>
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/update-post/:postId" element={<UpdatePost />} />

      </Route>
      <Route path="/projects" element={<Projects />} />
      <Route path="/posts/:postSlug" element={<PostPage />} />


    </Routes>
    <Footer />
    </BrowserRouter>
    <Toaster />

    </ThemeProvider>
  )
}

export default App