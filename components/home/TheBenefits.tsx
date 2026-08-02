"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  label: string;
  image: string;
  text: string;
}

const categories: Category[] = [
  {
    label: "A TRUE ORIGINAL",
    image: "/images/benefits/1.jpeg",
    text: 'Blue Nile is the original online jeweler. Since 1999, we’ve provided the best product quality and price available along with access to top quality diamonds, metals, and fine jewelry.'
  },
  {
    label: "DISTINCTIVE SERVICE",
    image: "/images/benefits/2.jpeg",
    text: 'Don’t know where to start? We provide expert guidance and knowledgeable advice at every touchpoint. We’re here for all your questions, no matter how big or small.'
  },
  {
    label: "INDUSTRY LEADERS",
    image: "/images/benefits/3.jpeg",
    text: 'We set a higher standard in fine jewelry with ethically sourced diamonds, responsible mining, and craftsmanship backed for life. Seamless shopping tools and peace of mind come with every order.'
  },
  {
    label: "INNOVATIVE ASSORTMENT",
    image: "/images/benefits/4.jpeg",
    text: 'Choose from the world’s most beautiful diamonds, hand selected by our experts and crafted into exceptional pieces by highly skilled artisans.'
  }
];

type ScrollDirection = "left" | "right";


export default function TheBenefits() {
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
    <section className="relative w-full">
      {/* Left arrow */}
      <h3 className="text-2xl font-normal leading-[normal] min-w-[200px] text-[#0c1636]">ONLY AT BLUE NILE</h3>
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
          <span
            key={cat.label}
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
            <h3
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
            </h3>
            <p className="w-full h-20 text-sm font-normal leading-5 line-clamp-4">
              {cat.text}
            </p>
          </span>
        ))}
      </div>
    </section>
  );
}