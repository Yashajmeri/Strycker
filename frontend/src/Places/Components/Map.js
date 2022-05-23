import React, { useEffect, useRef } from 'react'
import "./Map.css"
function Map(props) {
    
    const mapRef = useRef();
    useEffect(()=>{
        const map = new window.google.maps.Map(mapRef.current, {
            center:props.center ,
            zoom :props.zoom
        });
        new window.google.maps.Marker({position:props.center,map:map })
    },[props.center,props.zoom])
    
    return (
        <div className='map' ref={mapRef}>
            
        </div>
    )
}

export default Map
