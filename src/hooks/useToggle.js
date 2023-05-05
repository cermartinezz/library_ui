import { useState } from "react";

function useToggle(initial_state = true) {

  const [visible, setVisible] = useState(initial_state);

  function toogle() {
    setVisible(!visible);
  }

  function changeVisibility(visible) {
    setVisible(visible);
  }

  return [visible, toogle, changeVisibility]
  
}

export default useToggle;