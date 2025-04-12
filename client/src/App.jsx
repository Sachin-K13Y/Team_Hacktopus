import { Route, BrowserRouter, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Experience from "./Pages/Experience";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>

      <Route path="/experience" element={<Experience />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
