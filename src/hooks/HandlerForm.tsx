import {ChangeEvent, useState} from "react";

export function useHandlerForm(inputValues: any) {

  const [values, setValues] = useState(inputValues);

  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };

  return {values, handlerChange, setValues};
}
