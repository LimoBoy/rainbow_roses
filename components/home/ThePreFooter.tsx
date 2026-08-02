"use client";
import Link from "next/link";
import { FormEvent, ReactNode } from "react";
import { MessageSquare, Phone, Mail, LucideIcon } from "lucide-react";

interface IconLink {
  label: string;
  icon: LucideIcon;
}

const customerCareLinks: IconLink[] = [
  { label: "Live Chat", icon: MessageSquare },
  { label: "+1 724-204-1868", icon: Phone },
  { label: "Email Us", icon: Mail },
];

const customerCareTextLinks: string[] = ["Contact Us", "FAQ", "Returns"];

const whyBlueNile: string[] = [
  "Return Policy",
  "Conflict Free Diamonds",
  "Diamond Price Matching",
  "Diamond Upgrade Program",
  "Free Limited Lifetime Warranty",
  "Free Secure Shipping",
  "Blue Nile Packaging",
  "Jewelry Insurance",
  "Jewelry Protection Plans",
  "Tax & Duty Calculator",
];

const aboutBlueNile: string[] = [
  "Quality & Value",
  "Reviews",
  "Diamond Sustainability",
  "Blue Nile Blog",
  "Locations",
  "Careers",
  "Affiliate Program",
  "Sale Exclusions",
];

interface FooterColumnProps {
  title: string;
  children: ReactNode;
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h3 className="font-bold text-slate-900 mb-4">{title}</h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

export default function ThePreFooter() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="w-full bg-white px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Customer Care */}
        <FooterColumn title="Customer Care">
          {customerCareLinks.map(({ label, icon: Icon }) => (
            <li key={label}>
              <Link
                href="#"
                className="flex items-center gap-2 text-slate-800 hover:text-gray-400"
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
          {customerCareTextLinks.map((label) => (
            <li key={label}>
              <Link href="#" className="text-slate-800 hover:text-gray-400">
                {label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        {/* Why Blue Nile */}
        <FooterColumn title="Why Blue Nile">
          {whyBlueNile.map((label) => (
            <li key={label}>
              <Link href="#" className="text-[#151542] hover:text-gray-400">
                {label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        {/* About Blue Nile */}
        <FooterColumn title="About Blue Nile">
          {aboutBlueNile.map((label) => (
            <li key={label}>
              <Link href="#" className="text-[#151542] hover:text-gray-400">
                {label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        {/* Newsletter */}
        <div className="flex flex-col">
          <h3 className="font-bold text-slate-900 mb-4">Join the Blue Nile - List</h3>
          <p className="text-slate-800 mb-4">Get Exclusive Offers and News</p>

          <form
            onSubmit={handleSubmit}
            className="flex items-end justify-between border-b border-slate-400 pb-2"
          >
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
            />
            <button
              type="submit"
              className="ml-4 shrink-0 text-sm font-semibold tracking-wide text-slate-900 hover:text-slate-950"
            >
              JOIN
            </button>
          </form>

          <p className="mt-4 text-xs leading-relaxed text-slate-600">
            I agree to receive promotional emails from Blue Nile. You can unsubscribe at any
            time.
            <br />
            By clicking join, you accept our{" "}
            <Link href="#" className="text-[#151542] hover:text-gray-400">
              Privacy Policy
            </Link>
            .
          </p>

          <div className="mt-8 flex items-center justify-end gap-6 sm:justify-start lg:justify-end">
            <Link
              href="#"
              aria-label="Facebook"
              className="flex items-center gap-2 text-slate-900 hover:text-gray-400"
            >
              {/* <Facebook className="h-4 w-4" fill="currentColor" strokeWidth={0} /> */}
              <span className="text-sm">Facebook</span>
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="flex items-center gap-2 text-slate-900 hover:text-gray-400"
            >
              {/* <Instagram className="h-4 w-4" strokeWidth={1.75} /> */}
              <span className="text-sm">Instagram</span>
            </Link>
            <Link
              href="#"
              aria-label="Pinterest"
              className="flex items-center gap-2 text-slate-900 hover:text-gray-400"
            >
              {/* Pinterest icon (not in lucide-react) */}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12.017 0C5.396 0 0 5.396 0 12.017c0 5.086 3.163 9.437 7.627 11.184-.105-.949-.2-2.406.042-3.443.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.194-.332 1.36-.052.221-.174.267-.4.161-1.492-.694-2.424-2.874-2.424-4.623 0-3.762 2.733-7.217 7.881-7.217 4.139 0 7.356 2.949 7.356 6.888 0 4.108-2.591 7.414-6.187 7.414-1.209 0-2.345-.628-2.732-1.37l-.744 2.835c-.269 1.037-.998 2.336-1.487 3.129 1.121.346 2.31.53 3.542.53 6.621 0 12.017-5.396 12.017-12.017C24.034 5.396 18.638 0 12.017 0z" />
              </svg>
              <span className="text-sm">Pinterest</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
