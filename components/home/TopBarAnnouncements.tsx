"use client";
import { useEffect, useState } from "react";

const announcements = [
  {
    text: (
      <>
        Up to <span className="font-bold">50% Off*</span> the James Allen
        Collection
      </>
    ),
    href: "/sale/james-allen",
  },
  {
    text: (
      <>
        Up to <span className="font-bold">30% Off*</span> Select Styles
      </>
    ),
    href: "/sale/select-styles",
  },
];

export function Announcement() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((i) => (i + 1) % announcements.length);
        setVisible(true);
      }, 250);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const announcement = announcements[index];

  return (
    <a
      href={announcement.href}
      className={`block text-center text-xs font-medium transition-all duration-300 sm:text-sm ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-1 opacity-0"
      }`}
    >
      {announcement.text}
    </a>
  );
}