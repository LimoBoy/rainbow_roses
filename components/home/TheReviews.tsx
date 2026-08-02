"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

interface Review {
  text: string;
  author: string;
}

const reviews: Review[] = [
  {
    text: "Amazing selection at incredible prices!",
    author: "Ryan K.",
  },
  {
    text: "Our wedding bands are perfect. Simple. High quality. Easy. Comfortable.",
    author: "Melissa S.",
  },
  {
    text: "Beautiful and great price",
    author: "Carolyn M.",
  },
  {
    text: "Exactly as depicted. Beautiful ring, superb quality. Excellent service.",
    author: "Scott C.",
  },
  {
    text: "Couldn't be happier with my purchase!",
    author: "Anna T.",
  },
  {
    text: "Fantastic customer service from beginning to end.",
    author: "James L.",
  },
];

const ITEMS_PER_PAGE = 4;

export default function TheReviews() {
  const [page, setPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  const visibleReviews = reviews.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const changePage = (
    newPage: number,
    dir: "left" | "right"
  ) => {
    if (
      isAnimating ||
      newPage < 0 ||
      newPage >= totalPages ||
      newPage === page
    ) {
      return;
    }

    setDirection(dir);
    setIsAnimating(true);

    setTimeout(() => {
      setPage(newPage);

      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  return (
    <section className="bg-[#fbf8f4] py-16">
      <div className="mx-auto max-w-[1700px] px-8">

        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-light uppercase tracking-wide text-[#08153b]">
            Reviews
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => changePage(page - 1, "left")}
              disabled={page === 0}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full bg-white
                shadow-sm
                transition-all duration-200
                hover:scale-105 hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <ChevronLeft
                size={18}
                strokeWidth={1.5}
                className="text-[#08153b]"
              />
            </button>

            <button
              onClick={() => changePage(page + 1, "right")}
              disabled={page === totalPages - 1}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full bg-white
                shadow-sm
                transition-all duration-200
                hover:scale-105 hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <ChevronRight
                size={18}
                strokeWidth={1.5}
                className="text-[#08153b]"
              />
            </button>
          </div>
        </div>


        {/* Reviews */}
        <div
          className={`
            grid grid-cols-1 gap-10
            md:grid-cols-2
            xl:grid-cols-4
            transition-all duration-300 ease-in-out

            ${
              isAnimating
                ? direction === "right"
                  ? "translate-x-8 opacity-0"
                  : "-translate-x-8 opacity-0"
                : "translate-x-0 opacity-100"
            }
          `}
        >
          {visibleReviews.map((review, index) => (
            <div
              key={index}
              className="max-w-sm"
            >
              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                    strokeWidth={1.5}
                    className="text-[#08153b]"
                  />
                ))}
              </div>


              {/* Text */}
              <p
                className="
                  mb-6
                  line-clamp-3
                  text-[17px]
                  leading-[1.6]
                  text-[#08153b]
                "
              >
                {review.text}
              </p>


              {/* Author */}
              <span
                className="
                  text-sm
                  font-medium
                  text-[#08153b]
                "
              >
                {review.author}
              </span>
            </div>
          ))}
        </div>


        {/* Pagination */}
        <div className="mt-10 flex justify-end gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() =>
                changePage(
                  index,
                  index > page ? "right" : "left"
                )
              }
              className={`
                h-1.5 rounded-full
                transition-all duration-300

                ${
                  page === index
                    ? "w-8 bg-[#08153b]"
                    : "w-1.5 bg-[#08153b]/30"
                }
              `}
            />
          ))}
        </div>

      </div>
    </section>
  );
}