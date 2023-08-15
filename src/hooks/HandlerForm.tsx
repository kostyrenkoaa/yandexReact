import {ChangeEvent, useState} from "react";

export function useHandlerForm<T>(inputValues: T) {

  const [values, setValues] = useState(inputValues);

  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };

  return {values, handlerChange, setValues};
}
