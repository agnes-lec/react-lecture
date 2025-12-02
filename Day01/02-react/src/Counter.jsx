import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>React Counter</h2>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <p>{count}</p>
    </div>
  );
}
