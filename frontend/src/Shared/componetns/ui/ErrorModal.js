import React from 'react'
import "./ErrorModal.css"
function ErrorModal(props) {
    
    return (
        <div className='errorDiv'>
             <div
        className={`backdrop ${props.errorState? "active" : ""}`}
        onClick={props.onClear}
      ></div>
      <div className={`errorModal ${props.errorState ? "active" : ""}`}>
        <div className="header3">
          <p>An Error occured!</p>
        </div>
        <div className="maindelete">
          <p>
           {props.error}
          </p>
        </div>
        <div className="buttons">
          
          <button className="cancel" onClick={props.onClear}>
           Okay
          </button>
        </div>
      </div>
        </div>
    )
}

export default ErrorModal
