import React from 'react'
import "./UserItem.css";
import {Link} from "react-router-dom";
function UserItem(props) {
    return (
        <Link className='link' to={`/${props.id}/places`}><li className='user-item'>
        <div className="profile-container">
            <div className="user-image">
                <img src={`http://localhost:5000/${props.image}`} alt={props.name} className="pic" />
            </div>
            <div className="user-info">
                <h3>{props.name}</h3>
                {/* <p>{props.placeCount} {props.placeCount===1 || props.placeCount===0 ?"post":"posts"}</p> */}
            </div>
        </div>
    </li></Link>
        
    )
}

export default UserItem;
