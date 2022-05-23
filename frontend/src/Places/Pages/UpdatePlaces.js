import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Input from "../../Shared/componetns/formElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/componetns/util/Validator";
import { useForm } from "../../Shared/Hooks/from-hook";
import "./UpdatePlaces.css";
import { useHttpClient } from "../../Shared/Hooks/http-hook"; 
import LoadingSpinner from "../../Shared/componetns/ui/LoadingSpinner";
import ErrorModal from "../../Shared/componetns/ui/ErrorModal";
import { useHistory } from "react-router-dom";
import { AuthConetxt } from "../../Shared/componetns/context/auth-context";


function UpdatePlaces() {
  const placeId = useParams().placeId;
  const { error, isLoading, sendRequest, errorOccur, errorHandler}=useHttpClient()
  const [loadedPlaces,setLoadedPlaces]= useState();
  const history  = useHistory();
  const auth = useContext(AuthConetxt);
  const [formState, inputHandler,setData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  // const updatingPlace = DUMMY_PLACES.find((place) => {
  //   return place.id === placeId;
  // });
  // setData here 
    useEffect(()=>{
      const fetchData = async()=> {
        try {
          const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`)
            setLoadedPlaces(responseData.place);
            setData({
              title: {
                value: responseData.place.title,
                isValid: true,
              },
              description: {
                value: responseData.place.description,
                isValid: true,
              },
            },true)
        } catch(err) {}
      
        
      }
      fetchData();
    },[sendRequest,placeId,setData])

  // useEffect (()=>{
  //   if(updatingPlace) {
      
  //   }
   
  // },[setData,updatingPlace])
 
  if (!loadedPlaces && !error) {
    return <div className="card-no"><h2>Could not find Place</h2></div>;
     
  }
  // submitHandler
  const placeSubmitHandler = async(event) => {
    event.preventDefault();
    try {await sendRequest(`http://localhost:5000/api/places/${placeId}`,'PATCH',JSON.stringify({
      title:formState.inputs.title.value,
      description:formState.inputs.description.value
    }),{
      'Content-Type' :'application/json',
      Authorization:'Bearer ' +auth.token
    })
    // console.log(formState.inputs); 
    history.push('/'+auth.userId+'/places');
  } catch(err) {}
    
  };
 if(isLoading ) {
   return <LoadingSpinner asOverlay />
 }

  return (
    <React.Fragment>
    <ErrorModal error={error} errorState= {errorOccur} onClear= {errorHandler} />
    {!isLoading && loadedPlaces && (<div className="formDiv">
      <form action="" className="newPalceForm " onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address!"
          onInput={inputHandler}
          value={formState.inputs.title.value}
          valid={formState.inputs.title.isValid}
        />
        {/* value and valid is for just initialvalue */}
        <Input
          id="description"
          element="taxtarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description(at least 5 characters)"
          onInput={inputHandler}
          value={formState.inputs.description.value}
          valid={formState.inputs.description.isValid}
        />
        <button type="submit" disabled={!formState.isValid} className={`${formState.isValid ?"active":" "}`}>
          UPDATE
        </button>
      </form>
    </div>)}
      
    </React.Fragment>
    
  );
}

export default UpdatePlaces;
