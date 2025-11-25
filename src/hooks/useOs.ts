import { useEffect, useState } from "react";

// how to use
// const macOS = useOs()
// returns true/false

const useOs = () => {
  // get Os
  const [os, setOs] = useState(false);
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const id = setTimeout(() => {
      setOs(navigator.platform.indexOf("Mac") > -1);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return os;
};

export default useOs;
