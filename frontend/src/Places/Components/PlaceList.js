import React from "react";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";
import { useState } from "react";
import Map from "./Map";
import { Link } from "react-router-dom";
// import {
//   interaction, layer, custom, control, 
//   Interactions, Overlays, Controls,     
//   Map, Layers, Overlay, Util 
// } from "react-openlayers";
function PlaceList(props) {
  const [showModal, setShowModal] = useState(false);
  const [mylocation, setLoaction] = useState(null);
  const [address,setAddress] =useState(null)
  
  // useEffect(()=> {},[])
  const closeHandler= ()=> {
    setShowModal(false);
}
  const modalHandler =(location,address)=> {
      setShowModal(true);
    // console.log(location);
    setLoaction (location);
    setAddress(address);

  }
  // const getLoaction = ()=> {

  // }

  if (props.items.length === 0) {
    return (
      <div className="card-no">
        <h1>No places found</h1>
       <Link to="/places/new"><button>Share Place</button></Link> 
      </div>
    );
  }
  const backdropHandler =()=>{
      if(showModal) {
        setShowModal(false);
      }
  }
  
  //  console.log(mylocation);
 
  return (
    <ul className={`Place-list ${showModal ? "active":"" }`} >
     {/* modal */}
     <div className={`backdrop ${showModal ? "active":"" }`} onClick={backdropHandler}></div>
     <div className={`modal ${showModal ? "active":"" }`}>
        <div className="header2">
          {/* {props.items.map((place) => {
            return <h3>{place.address}</h3>;
          })} */}
          <h2>{address}</h2>
          <div onClick={closeHandler} className="close">
          <img src="https://img.icons8.com/color/2x/delete-sign.png" alt="" /></div>
        </div>
        <Map center = {mylocation} zoom = {16} />
        {/* <main className="main-map">
         
        </main> */}
        
      </div>
     
      
      {/* modal */}
      {props.items.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            location={place.location}
            modalHandler ={modalHandler}
            onDelete={props.onDeletePlace}
          />
        );
      })}
    </ul>
  );
}

export default PlaceList;
