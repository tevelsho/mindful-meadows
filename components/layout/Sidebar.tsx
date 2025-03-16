import React from "react";
import Link from "next/link";

const leafIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icon-tabler-leaf"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
    <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9 0 1 0 3 2 5h3z" />
  </svg>
);

const homeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="icon icon-tabler icons-tabler-filled icon-tabler-home"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" />
  </svg>
);

const links = [
  { href: "/", label: "Ngee Ann", color: "bg-gradient-to-r from-red-200 via-yellow-200 to-green-200", icon: leafIcon },
  { href: "/", label: "Tevel", color: "bg-orange-200", icon: homeIcon },
  { href: "/", label: "Jing Shun", color: "bg-yellow-200", icon: homeIcon },
  { href: "/", label: "Javier", color: "bg-green-200", icon: homeIcon },
  { href: "/", label: "Shawn", color: "bg-blue-200", icon: homeIcon },
  { href: "/", label: "Gavin", color: "bg-indigo-200", icon: homeIcon },
  { href: "/", label: "FP1", color: "bg-violet-200", icon: leafIcon },
  { href: "/", label: "FP2", color: "bg-red-200", icon: leafIcon },
  { href: "/", label: "FP3", color: "bg-orange-200", icon: leafIcon },
  { href: "/", label: "DSA", color: "bg-yellow-200", icon: leafIcon },
  { href: "/", label: "IMP", color: "bg-green-200", icon: leafIcon },
  { href: "/", label: "VOICE", color: "bg-blue-200", icon: leafIcon },
  { href: "/", label: "WISP", color: "bg-indigo-200", icon: leafIcon },
  { href: "/", label: "PROID", color: "bg-violet-200", icon: leafIcon }
];

export const Sidebar = () => {
  return (
    <div className="fixed right-0 top-[50%] -translate-y-1/2 flex items-center justify-center p-12 z-50 font-sans">
      <aside className="relative h-[600px] w-48 transition-all duration-500 ease-in-out border-4 border-black rounded-l-3xl shadow-[2px_2px_0_0_rgba(0,0,0,1)] overflow-y-auto overflow-x-hidden bg-[#E9EBE0]">
        <ul className="p-4 space-y-3">
          {links.map((item, i) => (
            <li
              key={i}
              className={`${item.color} flex items-center justify-start border-2 border-black rounded-md p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all duration-500 ease-in-out hover:bg-opacity-80 w-full h-12`}
            >
              <Link
                href={item.href}
                className="flex items-center w-full no-underline text-black"
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="flex-grow pl-2 font-bold whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};
