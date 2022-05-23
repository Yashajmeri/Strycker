import React, { useEffect, useState } from "react";
import PlaceList from "../Components/PlaceList";
import "./UserPlaces.css";
import LoadingSpinner from "../../Shared/componetns/ui/LoadingSpinner";
import ErrorModal from "../../Shared/componetns/ui/ErrorModal";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import { Link } from "react-router-dom";


function UserPlaces() {
  const userId = useParams().usedId;
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { error, isLoading, sendRequest, errorOccur, errorHandler } =
    useHttpClient();
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await sendRequest(
        `http://localhost:5000/api/places/user/${userId}`
      );
      setLoadedPlaces(responseData.places);
    };
    fetchData();
  }, [sendRequest, userId]);
  const deleteHandel = (deleteId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deleteId)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal
        error={error}
        errorState={errorOccur}
        onClear={errorHandler}
      />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={deleteHandel} />
      )}
      {  !isLoading && !loadedPlaces && !errorOccur && ( <div className="card-no">
        <h1>No places found</h1>
       <Link to="/places/new"><button>Share Place</button></Link> 
      </div>)}
     
    </React.Fragment>
  );
}

export default UserPlaces;
