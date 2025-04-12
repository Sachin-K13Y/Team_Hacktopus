import { Route, BrowserRouter, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Experience from "./Pages/Experience";
import SignUp from "./Pages/SignUp";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>

      <Route path="/experience" element={<Experience />} />
      <Route path="/sign-up" element={<SignUp />} />

      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
