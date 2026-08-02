import { MessageCircle } from "lucide-react";
import Link from "next/link";


interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Site Map", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Cookies Settings", href: "#" },
  { label: "Cookies Policy", href: "#" },
];

export default function FooterBottomBar() {
  const year = new Date().getFullYear();

  return (
    <div className="relative w-full border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-6 sm:px-10 lg:px-16">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="font-serif text-3xl tracking-tight text-slate-900">
            Blue Nile
          </span>
        </Link>

        {/* Copyright */}
        <span className="shrink-0 font-serif text-sm text-slate-700">
          &copy; {year} Blue Nile Inc.
        </span>

        {/* Nav links */}
        <nav className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-3">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="whitespace-nowrap text-sm font-medium text-slate-800 hover:text-gray-400"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Floating chat button */}
      <button
        type="button"
        aria-label="Open chat"
        className="absolute right-4 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-colors hover:bg-slate-800 sm:right-8"
      >
        <MessageCircle className="h-7 w-7" fill="currentColor" strokeWidth={0} />
      </button>
    </div>
  );
}
