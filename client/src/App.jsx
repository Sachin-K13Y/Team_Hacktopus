import { Route, BrowserRouter, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Experience from "./Pages/Experience";
import Home from "./Pages/Home";
import News from "./Pages/News";
import DoubtForum from "./Pages/DoubtForum"

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>

      <Route path="/experience" element={<Experience />} />
      <Route path="/" element={<Home />} />
      <Route path="/doubts" element={<DoubtForum />} />
      <Route path="/news" element={<News/>} />

      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
