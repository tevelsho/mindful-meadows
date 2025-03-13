import Garden from "@/components/three/Garden";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-1 w-screen">
      <div className="h-full flex flex-row">
        <Garden />
        <p className="w-2/5">The sidebar</p>
      </div>
    </div>
  );
}
