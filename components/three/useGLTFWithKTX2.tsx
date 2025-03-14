import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { KTX2Loader } from "three-stdlib";

const ktx2Loader = new KTX2Loader();
ktx2Loader.setTranscoderPath("/basis/");

interface UseGLTFWithKTX2Props {
  path: string;
}

export function useGLTFWithKTX2({ path }: UseGLTFWithKTX2Props) {
  const { gl } = useThree();

  return useGLTF(path, true, true, (loader) => {
    loader.setKTX2Loader(ktx2Loader.detectSupport(gl));
  });
}
