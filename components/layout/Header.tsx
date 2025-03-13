import React from "react";
import Link from "next/link";
export const Header = () => {
  return (
    <section className="flex flex-row justify-between p-12">
      <h2 className="font-sans font-bold text-3xl text-amber-900">
        Mindful Meadows
      </h2>
      <nav className="flex flex-row space-x-4 justify-center items-center font-sans text-lg text-amber-900 gap-8">
        <Link href="/">Something 1</Link>
        <Link href="/">Something 2</Link>
        <Link href="/">Something 3</Link>
      </nav>
    </section>
  );
};
