import React from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Ngee Ann", color: "bg-pink-200" },
  { href: "/", label: "WISP", color: "bg-blue-200" },
  { href: "/", label: "COTI", color: "bg-green-200" },
  { href: "/", label: "IMP", color: "bg-yellow-200" },
  { href: "/", label: "CGRC", color: "bg-purple-200" },
  { href: "/", label: "BSAI", color: "bg-orange-200" },
  { href: "/", label: "FP1", color: "bg-lime-200" },
  { href: "/", label: "FP2", color: "bg-teal-200" },
  { href: "/", label: "FP3", color: "bg-red-200" },
  { href: "/", label: "DSA", color: "bg-indigo-200" },
];

export const Sidebar = () => {
  return (
    <div
      className="
        fixed
        right-0
        top-1/2
        -translate-y-1/2
        flex
        items-center
        justify-center
        p-12
        z-50
      "
    >
      <aside
        className="
          group
          relative
          h-96
          w-24
          hover:w-48
          transition-all
          duration-300
          border-4
          border-black
          rounded-l-3xl
          shadow-[8px_8px_0_0_rgba(0,0,0,1)]
          overflow-y-auto
          bg-white
        "
      >
        <ul className="p-4 space-y-3">
          {links.map((item, i) => (
            <li
              key={i}
              className={`
                flex
                items-center
                ${item.color}
                border-2
                border-black
                rounded-md
                p-2
                shadow-[4px_4px_0_0_rgba(0,0,0,1)]
              `}
            >
              <Link href={item.href} className="flex items-center no-underline text-black">
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
                <span className="ml-2 hidden group-hover:inline-block font-bold">
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
