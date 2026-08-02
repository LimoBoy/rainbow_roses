"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  label: string;
  href: string;
  image: string;
}

const categories: Category[] = [
  {
    label: "Engagement Rings",
    href: "/engagement-rings",
    image: "/images/carousel/diamond engagement rings.jpeg",
  },
  {
    label: "Wedding Rings",
    href: "/wedding-rings",
    image: "/images/carousel/collection of diamond wedding rings and bands.jpeg",
  },
  {
    label: "Diamonds",
    href: "/diamonds",
    image: "/images/carousel/loose diamonds.jpeg",
  },
  {
    label: "DIAMOND JEWELRY",
    href: "/gifts",
    image: "/images/carousel/Model wearing diamond jewelry rings and necklaces.jpeg",
  },
  {
    label: "EARRINGS",
    href: "/earrings",
    image: "/images/carousel/2 pairs of bezel set diamond earrings.jpeg",
  },
  {
    label: "NECKLACES",
    href: "/necklaces",
    image: "/images/carousel/A diamond pendant, and tennis necklace stacked.jpeg",
  },
  {
    label: "BRACELETS",
    href: "/bracelets",
    image: "/images/carousel/diamond tennis bracelet.jpeg",
  },
  {
    label: "ALL JEWELRY",
    href: "/all-jewelry",
    image: "/images/carousel/a diamond ring, pearl earring and necklace, a bracelet and ring layered together.jpeg",
  },
];

type ScrollDirection = "left" | "right";


export default function TheCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Drag state
  const isDragging = useRef<boolean>(false);
  const hasDragged = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startScrollLeft = useRef<number>(0);

  const updateArrows = (): void => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (direction: ScrollDirection): void => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 400;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    startScrollLeft.current = el.scrollLeft;
    el.classList.add("cursor-grabbing");
    el.classList.remove("cursor-grab");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const el = scrollRef.current;
    if (!el || !isDragging.current) return;
    e.preventDefault();

    const delta = e.pageX - startX.current;

    // Treat as a real drag only past a small threshold,
    // so normal clicks on a card still navigate.
    if (Math.abs(delta) > 5) {
      hasDragged.current = true;
    }

    el.scrollLeft = startScrollLeft.current - delta;
  };

  const endDrag = (): void => {
    const el = scrollRef.current;
    isDragging.current = false;
    if (el) {
      el.classList.remove("cursor-grabbing");
      el.classList.add("cursor-grab");
    }
    updateArrows();
  };

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    // Suppress the link navigation if the user just finished dragging
    if (hasDragged.current) {
      e.preventDefault();
    }
  };

  return (
    <section className="relative w-full border-t border-gray-200">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Previous"
          className="
            absolute left-3 top-[calc(50%-24px)] -translate-y-1/2 z-10
            w-9 h-9 rounded-full bg-white shadow-md
            flex items-center justify-center
            hover:bg-gray-50
          "
        >
          <ChevronLeft size={18} className="text-[#0a1f3c]" />
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Next"
          className="
            absolute right-3 top-[calc(50%-24px)] -translate-y-1/2 z-10
            w-9 h-9 rounded-full bg-white shadow-md
            flex items-center justify-center
            hover:bg-gray-50
          "
        >
          <ChevronRight size={18} className="text-[#0a1f3c]" />
        </button>
      )}

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        className="
          flex gap-6
          overflow-x-auto
          scroll-smooth
          snap-x snap-mandatory
          cursor-grab
          select-none
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
      >
        {categories.map((cat) => (
          <a
            key={cat.label}
            href={cat.href}
            onClick={handleCardClick}
            draggable={false}
            className="
              group
              shrink-0
              snap-start
              w-[85%] sm:w-[45%] lg:w-[32%]
              border-r border-gray-100
            "
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50">
              <img
                src={cat.image}
                alt={cat.label}
                draggable={false}
                className="
                  w-full h-full object-cover
                  transition-transform duration-500
                  group-hover:scale-105
                  pointer-events-none
                "
              />
            </div>
            <p
              className="
                pt-5 pb-6 pl-1
                text-[13px]
                font-medium
                tracking-wide
                uppercase
                text-[#0a1f3c]
              "
            >
              {cat.label}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}