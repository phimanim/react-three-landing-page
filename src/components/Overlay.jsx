import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import "./overlay.css";

function Hidden() {
  const [hidden, setHidden] = useState({
    words : ["Paul Henschel", "react-three/fiber", "react-three/drei"],
    speed : 2000,
    index : 0,
    text : ""
  });
  
console.log("hidden", hidden.words[hidden.index])
  const RollingText = () => {
    hidden.text = hidden.words[hidden.index];
    hidden.index += 1;

    if (hidden.index = hidden.words.length) {
      hidden.index = 0;
    }
  };

  useEffect(() => {
    let i = hidden.index
    let appear = hidden.words
    setHidden(appear[i]);
    setInterval(RollingText(), hidden.speed);
  });

  return <>{hidden.text}</>;
}
export default function Overlay() {
  return (
    <div className="Container">
      <div className="Overlay">
        <h1>Bonjour !</h1>
        <p style={{ height: "70px" }}>
          Built with help of <span>Paul Henschel</span>
          <span className="Transition">react-three/fiber</span>
          <span className="Transition">react-three/drei</span>
        </p>
        <Hidden />
      </div>
    </div>
  );
}
