import { Route, BrowserRouter, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Experience from "./Pages/Experience";
import Home from "./Pages/Home";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>

      <Route path="/experience" element={<Experience />} />
      <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
