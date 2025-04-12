import { Route, BrowserRouter, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import News from "./Pages/News";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/news" element={<News/>} />

      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
