import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Group, Mesh } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import LoadingCube from '@/components/LoadingCube';

interface MeshComponentProps {
  fileUrl: string | null;
  setIsLoading: (isLoading: string | null) => void;
  castShadow?: boolean;
  receiveShadow?: boolean;
  sceneGroup: RefObject<Group>;
}

function MeshComponent({
  fileUrl,
  setIsLoading,
  sceneGroup,
}: MeshComponentProps) {
  const model = useRef<Mesh | null>(null);
  const [gltf, setGltf] = useState<GLTF | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const handleUserInteraction = () => {
    // Set the flag to indicate user interaction
    setHasUserInteracted(true);
  };

  useEffect(() => {
    if (fileUrl) {
      // Perform a POST request to fetch the 3D model data
      fetch(fileUrl, {
        method: 'POST',
      })
        .then((response) => response.arrayBuffer())
        .then((data) => {
          const loader = new GLTFLoader();
          loader.parse(data, '', (gltfResult) => {
            setGltf(gltfResult);
            setIsLoading(null);
          });
        })
        .catch((error) => {
          setIsLoading(`Error Loading 3D Model:', ${error}`);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    if (sceneGroup.current && gltf && !hasUserInteracted) {
      sceneGroup.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      castShadow
      receiveShadow
      ref={model}
      onPointerDown={handleUserInteraction}
    >
      {gltf && <primitive object={gltf.scene} />}
    </mesh>
  );
}

export default function ModelViewer({
  fileUrl,
  theme,
}: {
  fileUrl: string | null;
  theme: string;
}) {
  const [isLoading, setIsLoading] = useState<string | null>(
    'Loading Project Model...'
  );
  const sceneGroup = useRef<Group>(null);

  return (
    <div className='flex h-[50vh] w-full items-center justify-center md:h-[75vh]'>
      {fileUrl ? (
        <>
          {isLoading && (
            <div className=' absolute flex flex-col items-center justify-center gap-5'>
              <LoadingCube theme={theme} />
              <p>{isLoading}</p>
            </div>
          )}

          <Canvas
            camera={{
              position: [20, 12, 20],
            }}
            shadows
          >
            <OrbitControls
              enableZoom={isLoading ? false : true}
              zoomSpeed={1}
            />

            {/* Ambient Light */}
            <ambientLight intensity={0.75} />

            <group ref={sceneGroup}>
              {/* Directional Light (Sunlight) */}
              <directionalLight
                castShadow
                intensity={2}
                position={[-10, 20, 10]}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />

              {/* Model Component */}
              <MeshComponent
                castShadow
                receiveShadow
                fileUrl={fileUrl}
                setIsLoading={setIsLoading}
                sceneGroup={sceneGroup}
              />
            </group>
          </Canvas>
        </>
      ) : (
        <p>Project Model Is Not Available!</p>
      )}
    </div>
  );
}
