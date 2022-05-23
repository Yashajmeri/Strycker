import React, { useState } from 'react';
// import {NavLink} from 'react-router-dom';
import "./MainHeader.css"
import NavLinks from './NavLinks';
import RightMenu from './RightMenu';
import{BsFillBarChartFill} from "react-icons/bs";

function MainHeader() {

    const[isToggle,setIsToggle]=useState(false)
    const toggleHandler = ()=> {
        setIsToggle(!isToggle);
    }

    return (
        
     <header>
         <div className="logo">
             <img src="https://img.icons8.com/ios-filled/344/ffffff/camera-icon-with-face.png" alt=""   />
             
         </div>
         <h2><strong>StrYcker</strong></h2>
      <NavLinks class="links"/>
      <div className="toggle" onClick={toggleHandler}>
          {/* <img src="https://img.icons8.com/ios-filled/2x/bar-chart.png" alt="" className='barchart' /> 
          */}
          <BsFillBarChartFill className='barchart' />
      </div>
       <RightMenu toggle={isToggle} settoggle={setIsToggle}/>
      
     </header>
    )
}

export default MainHeader
