import React, { useEffect, useRef, useState } from "react";
import "./ImageUpload.css";
function ImageUpload(props) {
  const [file, setFile] = useState();
  const [prevurl, setprevUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePick = useRef();
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setprevUrl(fileReader.result);
      // console.log(prevurl);
      //  console.log(fileReader.result);
      
    };
    fileReader.readAsDataURL(file);

  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid;
    if (event.target.files && event.target.files.length === 1) {
    
      pickedFile = event.target.files[0];
      //  console.log(pickedFile);
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
    // console.log(event.target.files);
    
  };
  const pickImagehandler = () => {
    filePick.current.click();
  };

  return (
    <div className="imagectrl">
      <input
        id={props.id}
        ref={filePick}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className="imgUpload">
        <div className="imgPreview">
        {/* {  console.log(prevurl)} */}
         {prevurl && <img src={prevurl} alt="preview" />} 
         {!prevurl && <p>Please pick an image.</p>}
        </div>
        <button type="button" onClick={pickImagehandler}>
          PICK-IMAGE
        </button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}

export default ImageUpload;
