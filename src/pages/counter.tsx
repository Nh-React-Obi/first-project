import { useState } from "react";
import { useEffect } from "react";

function useCounter() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    if (count === 9) {
      setCount(0);
    }
  }, [count]);

  return {
    count,
    increase,
    decrease,
  };
}

export default useCounter;
