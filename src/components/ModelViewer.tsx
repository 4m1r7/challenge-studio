import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Mesh } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface MeshComponentProps {
  fileUrl: string | null;
  setIsLoading: (isLoading: string | null) => void;
}

function MeshComponent({ fileUrl, setIsLoading }: MeshComponentProps) {
  const model = useRef<Mesh | null>(null);
  const [gltf, setGltf] = useState<GLTF | null>(null);

  useEffect(() => {
    if (fileUrl) {
      // Perform a POST request to fetch the 3D model data
      fetch(fileUrl, {
        method: 'POST',
      })
        .then((response) => response.arrayBuffer()) // Assuming the response is in binary format
        .then((data) => {
          const loader = new GLTFLoader();
          loader.parse(data, '', (gltfResult) => {
            setGltf(gltfResult);
            setIsLoading(null);
          });
        })
        .catch((error) => {
          setIsLoading(`Error loading 3D model:', ${error}`);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl]);

  useFrame(() => {
    if (model.current && gltf) {
      model.current.rotation.y += 0.005;
    }
  });

  return <mesh ref={model}>{gltf && <primitive object={gltf.scene} />}</mesh>;
}

export default function ModelViewer({ fileUrl }: { fileUrl: string | null }) {
  const [isLoading, setIsLoading] = useState<string | null>(
    'Loading project Model...'
  );

  return (
    <div className='flex h-[75vh] w-full items-center justify-center'>
      {fileUrl ? (
        <>
          {isLoading && <p className='absolute'>{isLoading}</p>}
          <Canvas
            camera={{
              position: [25, 12, 25],
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

            <MeshComponent fileUrl={fileUrl} setIsLoading={setIsLoading} />
          </Canvas>
        </>
      ) : (
        <p>Project Model Is Not Available!</p>
      )}
    </div>
  );
}
