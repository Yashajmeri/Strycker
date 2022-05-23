import React, { useContext, useState } from "react";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/componetns/util/Validator";
import { useForm } from "../../Shared/Hooks/from-hook";
import LoadingSpinner from "../../Shared/componetns/ui/LoadingSpinner";
import ErrorModal from "../../Shared/componetns/ui/ErrorModal";
import Input from "../../Shared/componetns/formElements/Input";
import "./Auth.css";
import { AuthConetxt } from "../../Shared/componetns/context/auth-context";
import ImageUpload from "../../Shared/componetns/formElements/ImageUpload";
function Auth() {
  const auth = useContext(AuthConetxt);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [errorOccure,setErrorOccure]=useState(false);
  const [formState, inputHandler, setData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmithandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    setIsLoading(true);
    if (isLogin) {

      try {
       
        const response = await fetch(
          "http://localhost:5000/api/users/login ",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );
        const responseData = await response.json();

        if(!response.ok) {
          throw new Error(responseData.message)
        }
        
        setIsLoading(false);
        auth.login(responseData.userId,responseData.token);
        console.log(responseData);
      } catch (err) {
        setIsLoading(false);
        // console.log(err);
        setError(err.message || "something went wrong please try again.");
        setErrorOccure(true);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email',formState.inputs.email.value);
        formData.append('name',formState.inputs.name.value);
        formData.append('password',formState.inputs.password.value);
       formData.append('image',formState.inputs.image.value);
    

        const response = await fetch(
          "http://localhost:5000/api/users/signup ",
          {
            method: "POST",
           
         body: formData,
          }
        );
        const responseData = await response.json();
        if(!response.ok) {
          throw new Error(responseData.message)
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login(responseData.userId,responseData.token);
      } catch (err) {
        setIsLoading(false);
        // console.log(err);
        setError(err.message || "something went wrong please try again.");
        setErrorOccure(true);
      }
    }
  };
  const switchHandler = () => {
    if (!isLogin) {
      setData(
        {
          ...formState.inputs,
          name: undefined,
          image:undefined
        },
        formState.inputs.email.isValid && formState.inputs.email.isValid
      );
    } else {
      setData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image:{
            value:null,
            isValid:false
          }
        },
        false
      );
    }

    setIsLogin(!isLogin);
  };
  const errorHandler = ()=> {
    setErrorOccure(false);
  }
  return (
    <React.Fragment>
    <ErrorModal error= {error} errorState={errorOccure} onClear={errorHandler}/>
       <div className="formDiv">
     {isLoading && <LoadingSpinner asOverlay/> }
      <form action="" className="newPalceForm " onSubmit={authSubmithandler}>
      {isLogin && <img
          src="https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg"
          alt=""
        />}
        
        <h2>{isLogin?"Login required":"Sign-Up required"}</h2>
        <hr />
        {!isLogin && (<ImageUpload id="image" onInput={inputHandler}  />)}
        {!isLogin && (
          <Input
            id="name"
            element="input"
            type="name"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a  name."
            onInput={inputHandler}
          />
        )}
        
        <Input
          id="email"
          element="input"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address!"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a valid password(at leat 8 characters.)"
          onInput={inputHandler}
        />
        <button
          type="submit"
          disabled={!formState.isValid}
          className={`${formState.isValid ? "active" : " "}`}
        >
          {isLogin ? " LOGIN" : "SIGNUP"}
        </button>
        <div className="signUp">
          <p>
            {isLogin
              ? "Do you want to create a new account?"
              : "Already have an account?"}
            <div onClick={switchHandler} className="signbtn">
              {isLogin ? "Sign-Up" : "Login"}
            </div>
          </p>
        </div>
      </form>
    </div>
    </React.Fragment>
   
  );
}

export default Auth;
