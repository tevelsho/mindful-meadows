import Garden from "@/app/components/three/Garden";
import Journal from "@/app/components/Journal";
import Mascot from "./components/ui/Mascot";

export default function Home() {
  return (
    <div className="flex-1 w-screen">
      <div className="h-full flex flex-row">
        <Garden />
        <Journal />
        <Mascot />
      </div>
    </div>
  );
}
