import React, { useEffect, useState } from "react";
import UserList from "../Components/UserList";
import LoadingSpinner from "../../Shared/componetns/ui/LoadingSpinner";
import ErrorModal from "../../Shared/componetns/ui/ErrorModal";
import {FiSearch} from "react-icons/fi";
import "./User.css";
// const USER = [
//   {
//     id: "u1",
//     name: "Yash",
//     image:
//       "https://media-exp1.licdn.com/dms/image/C4E03AQFcCbNry54z7A/profile-displayphoto-shrink_400_400/0/1649249693177?e=1655337600&v=beta&t=8kRCft802CxtHKGIY_WmaLapQmLVbKDZFDBP76inpHI",
//       places:3,
//   },
// ];

function User() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [errorOccur,setErrorOccur]= useState(false);
  const [user, setUser] = useState();
  const [search,setSearch] = useState('');
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setUser(responseData.users)
      } catch (err) {
        setError(err.message);
        setErrorOccur(true);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);
  const errorHandler = ()=> {
    setErrorOccur(false);
  }
  const handelSearch = (event) => {
     setSearch(event.target.value);
    
  }
  return (
    <React.Fragment>
     <div className="searchbox">
    <FiSearch className="searchIcon" />
      <input type="text" placeholder="Search by username" className="searchInput" onChange={handelSearch} />
    </div>  
      <div>
    <ErrorModal error={error} onClear={errorHandler} errorState={errorOccur} />
   
   {isLoading && <LoadingSpinner asOverlay />} 
  
     {!isLoading && user && <UserList items={user.filter((user)=>user.name.toLowerCase().includes(search))} />} 
    </div>
    </React.Fragment>
    
  );
}

export default User;
