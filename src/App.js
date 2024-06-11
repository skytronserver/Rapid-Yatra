import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Services from "./Pages/Services";
import TermsCondition from "./Pages/TermsCondition";

function App() {



  
  return (
    <div >
     
       

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/> } />
        <Route path="/about" element={<About/> } />
        <Route path="/contact" element={<Contact/> } />
        <Route path="/services" element={<Services/> } />
        <Route path="/termscondition" element={<TermsCondition/> } />
      </Routes>
    </BrowserRouter>
    
    

    
  
    </div>
  );
}

export default App;
