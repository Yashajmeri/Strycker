import React from "react";
import UserItem from "./UserItem";
import './UserList.css';

function UserList(props) {
  if (props.items.length === 0) {
    return <div className="card-no"><h1>No User Found!</h1>;</div> 
    
  }
  return (
      <div className="userList">
          <ul>
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            image={user.image}
            placeCount={user.places.length}
          />
        );
      })}
    </ul>
      </div>
    
  );
}

export default UserList;
