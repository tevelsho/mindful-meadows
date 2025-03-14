import Garden from "@/components/three/Garden";

export default function Room() {
  return (
    <div className="flex-1 w-screen">
      <div className="h-full flex flex-row">
        <Garden />
      </div>
    </div>
  );
}
