import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Detailed, Environment } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function Flower({ z, speed }) {
    const ref = useRef();
    const { viewport, camera } = useThree();
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
    const { nodes, materials } = useGLTF("/purple_flower-transformed.glb");
  
    const [data] = useState({
      x: THREE.MathUtils.randFloatSpread(2),
      y: THREE.MathUtils.randFloatSpread(height),
      rX: Math.random() * Math.PI,
      rY: Math.random() * Math.PI,
      rZ: Math.random() * Math.PI,
    });
  
    useFrame((state) => {
      ref.current.rotation.set(
        (data.rX += 0.006),
        (data.rY += 0.001),
        (data.rZ += 0.001)
      );
      ref.current.position.set(data.x * width, (data.y += 0.05 * speed), z);
      if (data.y > height) {
        data.y = -height;
      }
    });
  
    return (
        <mesh
        scale={0.04}
        ref={ref}
        geometry={nodes.purple_flower.geometry}
        material={materials.skin}
        rotation={[-Math.PI, 0, 0]}
      /> 
    );
  }

export default function Flowers({speed = 1, count = 100, depth = 80 }) {
    return (
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 100, fov: 30 }}>
        <color attach="background" args={["#ffb8e6"]} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          {Array.from({ length: count }, (_, i) => (
            <Flower key={i} index={i} z={(-i / count) * depth - 5} speed={speed}/>
          ))}
          <EffectComposer>
            <DepthOfField
              target={[0, 0, -depth/2]}
              focalLength={0.4}
              bokehScale={11}
              heigth={700}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    );
  }