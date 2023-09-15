import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function MeshComponent() {
  const fileUrl = '/Emdadgaran.glb';
  const model = useRef<Mesh | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gltf = useLoader(GLTFLoader as any, fileUrl);

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

export default function ModelViewer() {
  return (
    <div className='flex h-[75vh] w-full items-center justify-center'>
      <Canvas className=''>
        <OrbitControls />

        <directionalLight intensity={2} position={[1, 2, 1]} />
        <directionalLight intensity={1} position={[-1, -1, -1]} />
        <directionalLight intensity={0.5} position={[1, -1, -1]} />

        <ambientLight intensity={0.3} />

        <MeshComponent />
      </Canvas>
    </div>
  );
}
