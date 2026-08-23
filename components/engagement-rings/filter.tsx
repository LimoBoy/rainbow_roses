"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface Filter {
  label: string;
  options?: string[];
  type?: "dropdown" | "checkbox";
}

const filters: Filter[] = [
  {
    label: "Gender",
    options: ["Women's", "Men's", "Unisex"],
  },
  {
    label: "Style",
    options: ["Solitaire", "Halo", "Vintage", "Three Stone"],
  },
  {
    label: "Collections",
    options: ["Classic", "Luxury", "Modern"],
  },
  {
    label: "Ring Size",
    options: ["4", "5", "6", "7", "8", "9"],
  },
  {
    label: "Diamond Type",
    options: ["Natural", "Lab Grown"],
  },
  {
    label: "Shape",
    options: ["Round", "Oval", "Princess", "Emerald"],
  },
  {
    label: "Gemstones",
    options: ["Diamond", "Sapphire", "Ruby"],
  },
  {
    label: "Metal",
    options: ["Gold", "Platinum", "Rose Gold"],
  },
  {
    label: "Width",
    options: ["Thin", "Medium", "Wide"],
  },
  {
    label: "Price",
    options: ["Under $1000", "$1000 - $3000", "$3000+"],
  },
  {
    label: "On Sale",
    type: "checkbox",
  },
  {
    label: "Engravable",
    type: "checkbox",
  },
];

export default function ProductFilters() {
  const [open, setOpen] = useState<string | null>(null);

  const [checkedFilters, setCheckedFilters] = useState<
    Record<string, boolean>
  >({});

  const toggleCheckbox = (label: string) => {
    setCheckedFilters((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const resetFilters = () => {
  setCheckedFilters({});
};

  return (
    <section className="px-6 py-8">
      <h1 className="text-[28px] font-semibold text-[#0c1636]">
        Engagement Rings & Settings
      </h1>

      <p className="mt-3 max-w-4xl text-[17px] leading-6 text-[#0c1636]">
        Shop stylish engagement rings and custom designs. Choose from a large
        variety of engagement ring settings, styles, moissanites to find the right fit.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <div key={filter.label} className="relative">

            {filter.type === "checkbox" ? (
              <label
                className="
                  flex cursor-pointer items-center gap-3
                  rounded-full
                  border border-[#999]
                  px-5 py-3
                  text-[#0c1636]
                  transition
                  hover:border-[#0c1636]
                "
              >
                <input
                  type="checkbox"
                  checked={!!checkedFilters[filter.label]}
                  onChange={() => toggleCheckbox(filter.label)}
                  className="h-5 w-5 accent-[#0c1636]"
                />

                {filter.label}
              </label>
            ) : (
              <>
                <button
                  onClick={() =>
                    setOpen(
                      open === filter.label
                        ? null
                        : filter.label
                    )
                  }
                  className="
                    flex items-center gap-3
                    rounded-full
                    border border-[#999]
                    px-5 py-3
                    text-[#0c1636]
                    transition
                    hover:border-[#0c1636]
                  "
                >
                  {filter.label}

                  <ChevronDown
                    size={16}
                    className={`transition ${
                      open === filter.label
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {open === filter.label && (
                  <div
                    className="
                      absolute
                      left-0
                      top-14
                      z-20
                      min-w-[220px]
                      rounded-lg
                      border
                      bg-white
                      p-3
                      shadow-lg
                    "
                  >
                    {filter.options?.map((option) => (
                      <label
                        key={option}
                        className="
                          flex cursor-pointer items-center gap-3
                          rounded-md px-3 py-2
                          hover:bg-gray-100
                        "
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                        />

                        <span className="text-[#0c1636]">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
  {Object.entries(checkedFilters)
    .filter(([_, value]) => value)
    .map(([label]) => (
      <button
        key={label}
        onClick={() => toggleCheckbox(label)}
        className="
          flex items-center gap-3
          rounded-full
          bg-[#f7f7f7]
          px-4 py-2
          text-sm
          text-[#0c1636]
          transition
          hover:bg-gray-100
        "
      >
        {label}

        <X size={16} />
      </button>
    ))}

  {Object.values(checkedFilters).some(Boolean) && (
    <button
      onClick={resetFilters}
      className="
        ml-2
        text-sm
        font-semibold
        text-[#0c1636]
        hover:underline
      "
    >
      Reset Filters
    </button>
  )}
</div>
    </section>
  );
}