import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
// Import THREE from the 'three' package
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function MeshComponent({ fileUrl }: { fileUrl: string | null }) {
  const model = useRef<Mesh | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gltf = useLoader(GLTFLoader as any, fileUrl || '');

  useFrame(() => {
    if (model.current) {
      model.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={model}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export default function ModelViewer({ fileUrl }: { fileUrl: string | null }) {
  return (
    <div className='flex h-[75vh] w-full items-center justify-center'>
      {fileUrl ? (
        <Canvas
          camera={{
            position: [25, 12, 25], // Adjust the position of the camera to change the initial zoom level
          }}
        >
          <OrbitControls enableZoom={false} zoomSpeed={5} />

          {/* Ambient Light */}
          <ambientLight intensity={0.5} />

          {/* Directional Light (Sunlight) */}
          <directionalLight
            castShadow
            intensity={2.0}
            position={[10, 20, 10]}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <MeshComponent fileUrl={fileUrl} />
        </Canvas>
      ) : (
        <p>Project Model Is Not Available!</p>
      )}
    </div>
  );
}
