import { useEffect, useState } from "react"; 
import Navbar from "../navbar/Navbar";
import Header from "../hero/Header";
import Hero from "../hero/Hero";
import Entreprise from "../hero/Entreprise";
import Contact from "../contact/Contact";
import Footer from "../footer/Footer";
import Logine from "../hero/Logine";
 
import Demmande from "../hero/Demmande";
import Article from "../article/Article";
function App() {
  useEffect(()=>{
    window.addEventListener("scroll",()=>{
      if(window.scrollY > 300){setShowScrollB(true)}else{setShowScrollB(false)}
 
    })
  },[]);
  const [showScrollB,setShowScrollB]=useState(false);
  return (
    <div id="up" className="container">
      <Navbar />
      <Header/>
      <div className="divider" />
      <Hero/>
      <div className="divider" />
       <Demmande/>
      <div className="divider" />
      <Logine/>
      <div className="divider" />
      <Article/>
      <div className="divider" />
      <Entreprise/>
      <div className="divider" />
      <Contact/>
      <div className="divider" />
      <Footer />
      
     <a style={{opacity:showScrollB? 1:0,transition:"3s"}} href="#up">
        <button className="scroll2Top">∧</button>
    </a>
     
    </div>
  );
}

export default App;