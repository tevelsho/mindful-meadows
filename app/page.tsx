import Garden from "@/components/three/Garden";
import Popup from "@/components/Popup";
import Journal from "@/components/Journal";

export default function Home() {
  return (
    <div className="flex-1 w-screen">
      <div className="h-full flex flex-row">
        <Popup />
        <Garden />
        <Journal />
      </div>
    </div>
  );
}
