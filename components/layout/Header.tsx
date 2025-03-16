import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
      <section className="flex flex-row justify-between p-12 z-10 fixed w-full overflow-x-hidden">
        <Link href="/" className="no-underline">
          <h2 className="flex items-center font-sans font-bold text-3xl text-amber-900">
            <img
                src="/logo/mindful-meadows.png"
                alt="Mindful Meadows Logo"
                width={64}
                height={64}
                className="mr-4 rounded" // Use "rounded-full" if you prefer a fully circular shape
            />
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
