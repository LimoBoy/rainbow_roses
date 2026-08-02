"use client";
import { Search, User, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import Link from "next/link";
import {useModalStore} from "@/app/stores/modal-store";

export default function TheMenu() {
  const openModal = useModalStore((s) => s.openModal);
  const navLinks = [
    {
      label: "Engagement Rings",
      path: "/jewelry/engagement-rings",
    },
    {
      label: "Rings",
      path: "/jewelry/rings",
    },
    {
      label: "Earrings",
      path: "/jewelry/earrings",
    },
    {
      label: "Bracelets",
      path: "/jewelry/bracelets",
    },
    {
      label: "Necklaces",
      path: "/jewelry/necklaces",
    },
    {
      label: "Diamonds",
      path: "/jewelry/diamonds",
    },
    {
      label: "Gemstones",
      path: "/jewelry/gemstones",
    },
    {
      label: "Gifts & Collections",
      path: "/gifts-collections",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-gray-100">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="font-serif text-3xl tracking-tight text-[#0a1f3c]">
            Blue Nile
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="
                text-[13px]
                font-medium
                tracking-wide
                uppercase
                text-[#0a1f3c]
                hover:text-gray-500
                whitespace-nowrap
              "
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-5 shrink-0 cursor-pointer">
          <button onClick={() =>
              openModal(
                  <div>
                    <p>Any children you want here.</p>
                  </div>,
                  { title: "My Modal" }
              )
          } className="flex items-center gap-1.5 text-[#0a1f3c] hover:text-gray-500 cursor-pointer">
            <Search size={18} strokeWidth={1.75} />
            <span className="text-[13px] font-medium tracking-wide uppercase hidden md:inline">
              Search
            </span>
          </button>

          <Link href="/register" className="text-[#0a1f3c] hover:text-gray-500 cursor-pointer">
            <User size={20} strokeWidth={1.5} />
          </Link>

          <button className="text-[#0a1f3c] hover:text-gray-500 cursor-pointer">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>

          {/*<button className="flex items-center gap-0.5 text-[13px] font-medium text-[#0a1f3c] hover:text-gray-500">*/}
          {/*  USD*/}
          {/*  <ChevronDown size={14} strokeWidth={2} />*/}
          {/*</button>*/}
        </div>
      </div>
    </header>
  );
}