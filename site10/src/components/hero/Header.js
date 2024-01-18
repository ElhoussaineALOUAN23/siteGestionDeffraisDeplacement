 
import './Header.css';
import Lottie from "lottie-react";
import voyage  from  "../../animation/voyage.json";
 
 
export default function Header() {
  return (
    <section className='hero flex'>
      <div className='left-section '>
        
        <h1 className='name' >Management </h1> 
        <h1 className='name' >Of Travel </h1> 
        <h1 className='name' >Expenses ...</h1> 
         
         
        <p className='sub-title'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
         
        </p>
        
        
        <div className="all-icons flex">
        <div className="icon icon-twitter"></div>
        <div className="icon icon-instagram"></div>
        <div className="icon icon-facebook2"></div>
        </div>
         
      </div>
      <div className='right-section '><Lottie  style={{height:300}}animationData={voyage} /></div>
    </section>
  )
}
