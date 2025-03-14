import Garden from "@/components/three/Garden";
import Popup from "@/components/Popup";

export default function Home() {
  return (
    <div className="flex-1 w-screen">
      <div className="h-full flex flex-row">
        <Popup />
        <Garden />
      </div>
    </div>
  );
}
