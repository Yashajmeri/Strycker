import React, { useContext, useState } from "react";
import "./PlaceItem.css";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AuthConetxt } from "../../Shared/componetns/context/auth-context";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import ErrorModal from "../../Shared/componetns/ui/ErrorModal";
import LoadingSpinner from "../../Shared/componetns/ui/LoadingSpinner";
function PlaceItem(props) {
  //  const sendLoaction= ()=> {
  //    props.modalHandler=()=>{
  //        return props.location;
  //    }
  //  }
  const auth = useContext(AuthConetxt);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { error, isLoading, errorHandler, errorOccur, sendRequest } =
    useHttpClient();
  const showDeleteWarning = () => {
    setShowDeleteModal(true);
  };
  const cancelDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const confirmDeleteModal = async () => {
    setShowDeleteModal(false);
    // console.log(props.id);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        "DELETE",null,{
          Authorization:'Bearer ' +auth.token
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };
  const backdropHandler = () => {
    setShowDeleteModal(false);
  };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <li className="list">
        <ErrorModal
          error={error}
          errorState={errorOccur}
          onClear={errorHandler}
        />
        {/* delete modal */}
        <div
          className={`backdrop ${showDeleteModal ? "active" : ""}`}
          onClick={backdropHandler}
        ></div>
        <div className={`deleteModal ${showDeleteModal ? "active" : ""}`}>
          <div className="header3">
            <p>Are you sure?</p>
          </div>
          <div className="maindelete">
            <p>
              Do you want to proceed and delete this post? please note it can't
              be undone thereafter.
            </p>
          </div>
          <div className="buttons">
            <button className="confirm" onClick={cancelDeleteModal}>
              CANCEL
            </button>
            <button className="cancel" onClick={confirmDeleteModal}>
              DELETE
            </button>
          </div>
        </div>
        {/* delete modal */}
        <div className="card">
          <div className="image">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="info">
            <h2>{props.title}</h2>
            <h4>{props.address}</h4>
            <p>{props.description}</p>
          </div>
          <div className="action">
            <button
              className="btn1"
              onClick={() => props.modalHandler(props.location, props.address)}
            >
              <FaMapMarkerAlt className="icon-item" /> 
            </button>
            {auth.userId === props.creatorId && (
              <Link className="link" to={`/places/${props.id}`}>
                {" "}
                <button className="btn2">
                  <FaEdit className="icon-item" />
                  
                </button>
              </Link>
            )}
            {console.log(props.creator)}
            {auth.userId === props.creatorId && (
              <button className="btn3" onClick={showDeleteWarning}>
                {" "}
                <MdDelete className="icon-item" />
                
              </button>
            )}
          </div>
        </div>
      </li>
    </React.Fragment>
  );
}

export default PlaceItem;
