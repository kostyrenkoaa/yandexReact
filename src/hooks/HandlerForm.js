import {useState} from "react";

export function useHandlerForm(inputValues) {

  const [values, setValues] = useState(inputValues);

  const handlerChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };

  return {values, handlerChange, setValues};
}
