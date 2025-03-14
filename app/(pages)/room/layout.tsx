import { Header } from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // I removed the Sidebar and ProgressBar components from the layout cause it looks o
    <>{children}</>
  );
}
