import React, { useContext } from "react";
import Input from "../../Shared/componetns/formElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Shared/componetns/util/Validator";
import "./NewPlaces.css";
import { useForm } from "../../Shared/Hooks/from-hook";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import { AuthConetxt } from "../../Shared/componetns/context/auth-context";
import LoadingSpinner from "../../Shared/componetns/ui/LoadingSpinner";
import ErrorModal from "../../Shared/componetns/ui/ErrorModal";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../Shared/componetns/formElements/ImageUpload";

function NewPlace() {
  const auth = useContext(AuthConetxt);
  const { error, isLoading, sendRequest, errorOccur, errorHandler } =
    useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  // console.log (formState.isValid);
  const history = useHistory();
  const postSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(formState.inputs); //send this to the backend
    try {
      const formData = new FormData();
      formData.append('title',formState.inputs.title.value);
      formData.append('description',formState.inputs.description.value);
      formData.append('address',formState.inputs.address.value);
      formData.append('creator', auth.userId);
      formData.append('image',formState.inputs.image.value);
console.log(auth.token);
      await sendRequest(
        "http://localhost:5000/api/places/",
        "POST",
        formData,{
          Authorization:'Bearer ' +auth.token
        }
         
        
      );
      history.push(`/${auth.userId}/places`);
    } catch (err) {}
  };
  return (
    // <div className='NewPlaces'>
    //    <h1>New places are here!</h1>
    // </div>
    <React.Fragment>
      <ErrorModal error={error} errState={errorOccur} onClear={errorHandler} />
      <div className="formDiv">
        {isLoading && <LoadingSpinner asOverlay />}
        <form action="" className="newPalceForm " onSubmit={postSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid text!"
            onInput={inputHandler}
          />
          <Input
            id="address"
            element="input"
            type="text"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address!"
            onInput={inputHandler}
          />
          <ImageUpload
            id="image"
            onInput={inputHandler}
           
          />
          <Input
            id="description"
            element="taxtarea"
            type="text"
            label="description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description(at least 5 characters)"
            onInput={inputHandler}
          />
          <button
            type="submit"
            disabled={!formState.isValid}
            className={`${formState.isValid ? "active" : " "}`}
          >
            Post
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default NewPlace;
