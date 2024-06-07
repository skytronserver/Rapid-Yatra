import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login2 from "./Pages/Login2";
import Footer from "./Components/Footer";

function App() {



  
  return (
    <div >
     
       

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login2/> } />
        <Route path="/about" element={<About/> } />
        <Route path="/contact" element={<Contact/> } />
      </Routes>
    </BrowserRouter>
    
    

    
  
    </div>
  );
}

export default App;
