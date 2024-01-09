import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import React from 'react';
import { Group } from 'three';

import LoadingCube from '@/components/LoadingCube';

const MeshComponent = React.lazy(() => import('./MeshComponent'));

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
              <Suspense>
                <MeshComponent
                  castShadow
                  receiveShadow
                  fileUrl={fileUrl}
                  setIsLoading={setIsLoading}
                  sceneGroup={sceneGroup}
                />
              </Suspense>
            </group>
          </Canvas>
        </>
      ) : (
        <p>Project Model Is Not Available!</p>
      )}
    </div>
  );
}
