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


function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />

    </Routes>
    <Footer />
    </BrowserRouter>
    <Toaster />

    </ThemeProvider>
  )
}

export default App