import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <section className="flex flex-row justify-between p-12 z-10 fixed w-full overflow-x-hidden">
      <Link href="/" className="no-underline">
        <h2 className="flex items-center font-sans font-bold text-3xl text-amber-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="url(#blueGradient)"
            className="mr-2 icon icon-tabler icons-tabler-filled icon-tabler-paw"
          >
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4c9fdb" />
                <stop offset="100%" stopColor="#9DCAEB" />
              </linearGradient>
            </defs>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 10c-1.32 0 -1.983 .421 -2.931 1.924l-.244 .398l-.395 .688a50.89 50.89 0 0 0 -.141 .254c-.24 .434 -.571 .753 -1.139 1.142l-.55 .365c-.94 .627 -1.432 1.118 -1.707 1.955c-.124 .338 -.196 .853 -.193 1.28c0 1.687 1.198 2.994 2.8 2.994l.242 -.006c.119 -.006 .234 -.017 .354 -.034l.248 -.043l.132 -.028l.291 -.073l.162 -.045l.57 -.17l.763 -.243l.455 -.136c.53 -.15 .94 -.222 1.283 -.222c.344 0 .753 .073 1.283 .222l.455 .136l.764 .242l.569 .171l.312 .084c.097 .024 .187 .045 .273 .062l.248 .043c.12 .017 .235 .028 .354 .034l.242 .006c1.602 0 2.8 -1.307 2.8 -3c0 -.427 -.073 -.939 -.207 -1.306c-.236 -.724 -.677 -1.223 -1.48 -1.83l-.257 -.19l-.528 -.38c-.642 -.47 -1.003 -.826 -1.253 -1.278l-.27 -.485l-.252 -.432c-1.011 -1.696 -1.618 -2.099 -3.053 -2.099z" />
            <path d="M19.78 7h-.03c-1.219 .02 -2.35 1.066 -2.908 2.504c-.69 1.775 -.348 3.72 1.075 4.333c.256 .109 .527 .163 .801 .163c1.231 0 2.38 -1.053 2.943 -2.504c.686 -1.774 .34 -3.72 -1.076 -4.332a2.05 2.05 0 0 0 -.804 -.164z" />
            <path d="M9.025 3c-.112 0 -.185 .002 -.27 .015l-.093 .016c-1.532 .206 -2.397 1.989 -2.108 3.855c.272 1.725 1.462 3.114 2.92 3.114l.187 -.005a1.26 1.26 0 0 0 .084 -.01l.092 -.016c1.533 -.206 2.397 -1.989 2.108 -3.855c-.27 -1.727 -1.46 -3.114 -2.92 -3.114z" />
            <path d="M14.972 3c-1.459 0 -2.647 1.388 -2.916 3.113c-.29 1.867 .574 3.65 2.174 3.867c.103 .013 .2 .02 .296 .02c1.39 0 2.543 -1.265 2.877 -2.883l.041 -.23c.29 -1.867 -.574 -3.65 -2.174 -3.867a2.154 2.154 0 0 0 -.298 -.02z" />
            <path d="M4.217 7c-.274 0 -.544 .054 -.797 .161c-1.426 .615 -1.767 2.562 -1.078 4.335c.563 1.451 1.71 2.504 2.941 2.504c.274 0 .544 -.054 .797 -.161c1.426 -.615 1.767 -2.562 1.078 -4.335c-.563 -1.451 -1.71 -2.504 -2.941 -2.504z" />
          </svg>
          Mindful Meadows
        </h2>
      </Link>

      <nav className="flex flex-row items-center font-sans text-lg gap-4">
        <Link
          href="/rewards"
          className="
            no-underline
            text-black
            bg-[#8EB59B]
            border-2
            border-black
            rounded-full
            w-20
            h-20
            flex
            items-center
            justify-center
            shadow-[2px_2px_0_0_rgba(0,0,0,1)]
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="#FFFFFF"
            className="icon icon-tabler icons-tabler-filled icon-tabler-gift"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M18 4a4 4 0 0 1 3.995 3.8l.005 .2v8a4 4 0 0 1 -3.8 3.995l-.2 .005h-12a4 4 0 0 1 -3.995 -3.8l-.005 -.2v-8a4 4 0 0 1 3.8 -3.995l.2 -.005h12zm-5.493 5l-.19 .004c-.928 .052 -1.719 .583 -2.317 1.444c-.56 -.805 -1.288 -1.322 -2.139 -1.428l-.198 -.017l-.164 -.003l-.16 .005c-1.28 .086 -2.339 1.179 -2.339 2.495c0 1.226 1.222 2.211 2.453 2.447l.16 .026l-1.32 1.32l-.083 .094a1 1 0 0 0 0 1.226l.083 .094l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l2.293 -2.292l2.293 2.292l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.32 -1.32c1.229 -.169 2.502 -1.11 2.606 -2.315l.007 -.158l-.005 -.163c-.08 -1.189 -1.02 -2.162 -2.175 -2.316l-.159 -.016l-.154 -.005zm-.025 2l.102 .009c.194 .04 .367 .21 .407 .406l.009 .085l-.012 .031l-.034 .04c-.13 .135 -.513 .369 -.836 .42l-.118 .009h-.602l.052 -.1l.088 -.156c.27 -.444 .574 -.696 .852 -.738l.092 -.006zm-4.964 0l.084 .005l.094 .02c.254 .077 .523 .32 .765 .718l.09 .157l.05 .1h-.601l-.106 -.008c-.398 -.057 -.894 -.4 -.894 -.492c0 -.23 .194 -.446 .416 -.491l.102 -.01z" />
          </svg>
        </Link>

        <Link
          href="/home"
          className="
            no-underline
            text-black
            bg-[#8EB59B]
            border-2
            border-black
            rounded-full
            w-20
            h-20
            flex
            items-center
            justify-center
            shadow-[2px_2px_0_0_rgba(0,0,0,1)]
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-door"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 12v.01" />
            <path d="M3 21h18" />
            <path d="M6 21v-16a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v16" />
          </svg>
        </Link>
      </nav>
    </section>
  );
};
