import { useEffect, useState } from "react";


function useLocalStorage (key, initial_value) {

  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : initial_value
  })

  useEffect(() => {
    localStorage.setItem(key,JSON.stringify(value));
  }, [key,value]);

  return [value,setValue]

}

export default useLocalStorage;