import PersonalRoom from "@/app/components/three/PersonalRoom";

export const metadata = {
  title: "Home | Mindful Meadows",
};

export default function Home() {
  return (
    <div className="flex-1 w-screen">
      <div className="h-full flex flex-row">
        <PersonalRoom />
      </div>
    </div>
  );
}
