import { useFrame } from '@react-three/fiber';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Group, Mesh } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface MeshComponentProps {
  fileUrl: string | null;
  setIsLoading: (isLoading: string | null) => void;
  castShadow?: boolean;
  receiveShadow?: boolean;
  sceneGroup: RefObject<Group>;
}

export default function MeshComponent({
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
    let isMounted = true; // Added to prevent state updates if the component is unmounted

    const loadModel = async () => {
      if (fileUrl) {
        try {
          const response = await fetch(fileUrl, { method: 'POST' });
          const data = await response.arrayBuffer();
          const loader = new GLTFLoader();

          loader.parse(data, '', (gltfResult) => {
            if (isMounted) {
              setGltf(gltfResult);
              setIsLoading(null);
            }
          });
        } catch (error) {
          if (isMounted) {
            setIsLoading(`Error Loading 3D Model:', ${error}`);
          }
        }
      }
    };

    loadModel();

    return () => {
      isMounted = false; // Clean-up function to set isMounted to false
    };
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
