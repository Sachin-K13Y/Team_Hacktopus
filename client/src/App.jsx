import { Route, BrowserRouter, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Experience from "./Pages/Experience";
import Home from "./Pages/Home";
import News from "./Pages/News";
import SignUp from "./Pages/SignUp";
import DoubtForum from "./Pages/DoubtForum"
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";


function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>

      <Route path="/experience" element={<Experience />} />
      <Route path="/" element={<Home />} />
      <Route path="/doubts" element={<DoubtForum />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/login" element={<Login />} />
      <Route path="/news" element={<News/>} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />

      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
