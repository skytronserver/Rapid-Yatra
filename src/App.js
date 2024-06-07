import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Pages/Login";

function App() {



  
  return (
    <div >
     
       

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/> } />
        <Route path="/about" element={<About/> } />
        <Route path="/contact" element={<Contact/> } />
      </Routes>
    </BrowserRouter>
    
    

    
  
    </div>
  );
}

export default App;
