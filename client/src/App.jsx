import { Route, BrowserRouter, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>


      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
