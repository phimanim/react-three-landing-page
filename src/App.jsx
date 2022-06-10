import { Suspense, useState } from "react";
import Flowers from "./components/Flowers";
import { FadeIn, LeftMiddle } from "./components/styles";

export default function App() {
  const [speed, setSpeed] = useState(1);
  return (
    <div>
      <Suspense fallback={null}>
        <FadeIn>
          <Flowers speed={speed} />
        </FadeIn>
      </Suspense>

      <LeftMiddle>
        <input
          type="range"
          min="0"
          max="10"
          value={speed}
          step="1"
          onChange={(e) => setSpeed(e.target.value)}
        />
      </LeftMiddle>
    </div>
  );
}
