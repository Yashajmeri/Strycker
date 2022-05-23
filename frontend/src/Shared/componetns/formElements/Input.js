import React, { useReducer,useEffect } from "react";
import "./input.css";
import { validate } from "../util/Validator";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val,action.validators),
      };
      case "TOUCH": 
      return {
          ...state,
          isTouch :true
      }
    default:
      return state;
  }
};

function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value:props.value || "",
    isValid:props.valid || false,
    isTouch:false
  });
  const {id,onInput} = props;
  const {value, isValid}=inputState;

  useEffect(()=> {
    onInput(id,value,isValid)
  },[id,value,isValid,onInput])

  const onChangeHandelr = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value,validators:props.validators });
  };
  const touchHandler =()=> {
      dispatch({type:"TOUCH"})
  }
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChangeHandelr}
        value= {inputState.value}
        onBlur={touchHandler}

      />
    ) : (
      <textarea
        name=""
        id={props.id}
        rows={props.rows || 3}
        onChange={onChangeHandelr}
        value= {inputState.value}
        onBlur={touchHandler}
      />
    );
  return (
    <div className="formControl">
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouch && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;
