import { Phone, Calendar } from "lucide-react";
import { Announcement } from "./TopBarAnnouncements";

export function TopBar() {
  return (
    <header className="bg-slate-950 text-white">
      <div className="relative mx-auto flex h-12 max-w-screen-2xl items-center px-4 lg:px-6">
        {/* Left */}
        <div className="hidden min-w-[220px] items-center lg:flex">
          <a
            href="tel:+17242041868"
            className="flex items-center gap-2 text-sm hover:opacity-80"
          >
            <Phone className="h-4 w-4" />
            +1 724-204-1868
          </a>
        </div>

        {/* Center */}
        <div className="mx-auto md:absolute md:left-1/2 md:-translate-x-1/2">
          <Announcement/>
        </div>

        {/* Right */}
        <div className="ml-auto hidden items-center gap-6 md:flex">
          <a
            href="/appointment"
            className="flex items-center gap-2 text-sm hover:opacity-80"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden lg:inline">
              Virtual Appointment
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}