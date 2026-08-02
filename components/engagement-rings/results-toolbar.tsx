"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = ["Best Sellers", "Price: Low to High", "Price: High to Low", "Newest"] as const;
const SHIPPING_OPTIONS = ["Any Date", "Today", "Tomorrow", "This Week"] as const;

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}

function Dropdown({ label, value, onChange, options }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <span className="block text-xs text-slate-400 mb-1">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-1.5 text-sm font-semibold text-slate-900"
      >
        {value}
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" strokeWidth={2.5} />
      </button>

      {open && (
        <ul className="absolute right-0 top-full mt-1 min-w-[180px] rounded-md border border-slate-200 bg-white shadow-lg py-1 z-10">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onMouseDown={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50 ${
                  opt === value ? "font-semibold text-slate-900" : "text-slate-600"
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface ResultsToolbarProps {
  resultCount?: number;
}

export default function ResultsToolbar({ resultCount = 1496 }: ResultsToolbarProps) {
  const [sort, setSort] = useState<string>(SORT_OPTIONS[0]);
  const [shipping, setShipping] = useState<string>(SHIPPING_OPTIONS[0]);

  return (
    <div className="w-full bg-white px-4 py-3 flex items-center justify-between">
      <span className="text-sm text-slate-500">
        {resultCount.toLocaleString()} Results
      </span>

      <div className="flex items-center gap-8">
        <Dropdown label="Sort By" value={sort} onChange={setSort} options={SORT_OPTIONS} />
        <Dropdown
          label="Shipping Date by"
          value={shipping}
          onChange={setShipping}
          options={SHIPPING_OPTIONS}
        />
      </div>
    </div>
  );
}
