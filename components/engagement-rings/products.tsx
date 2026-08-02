"use client";
import { useState } from "react";
import { Heart, Star, ChevronUp } from "lucide-react";

interface MetalOption {
  name: string;
  swatch: string; // css color, or "text" for the Pt circle
  isTextSwatch?: boolean;
}

interface Product {
  id: string;
  title: string;
  price: string;
  priceLabel?: string;
  image: string;
  hoverImage: string;
  metals: MetalOption[];
  rating: number;
  reviewCount: number;
}

const METALS: MetalOption[] = [
  { name: "White Gold", swatch: "#f4f2ee" },
  { name: "Yellow Gold", swatch: "#e8b84b" },
  { name: "Rose Gold", swatch: "#e8b4a0" },
  { name: "Platinum", swatch: "", isTextSwatch: true },
];

const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Floral Marquise Diamond Engagement Ring in 18k White Gold",
    price: "$2,210",
    priceLabel: "(Setting Price)",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&q=80",
    metals: METALS,
    rating: 4.5,
    reviewCount: 8,
  },
  {
    id: "2",
    title: "Pear Sidestone Diamond Engagement Ring in 14k Yellow Gold (1/4 ct. tw.)",
    price: "$1,820",
    priceLabel: "(Setting Price)",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&q=80",
    metals: METALS,
    rating: 5,
    reviewCount: 63,
  },
  {
    id: "3",
    title: "Petite Twist Diamond Engagement Ring in 14k White Gold (1/10 ct. tw.)",
    price: "$1,380",
    priceLabel: "(Setting Price)",
    image:
      "https://images.unsplash.com/photo-1518992028580-6da3a5b39879?w=600&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1600003263720-1a1a2b0c5e5a?w=600&q=80",
    metals: METALS,
    rating: 5,
    reviewCount: 417,
  },
  {
    id: "4",
    title: "Petite Split Shank Solitaire in 14k Yellow Gold",
    price: "$1,165",
    priceLabel: "(Setting Price)",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80",
    hoverImage:
      "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=600&q=80",
    metals: METALS,
    rating: 4.5,
    reviewCount: 16,
  },
];

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.floor(rating);
          const half = !filled && i + 0.5 <= rating;
          return (
            <span key={i} className="relative w-3.5 h-3.5">
              <Star className="w-3.5 h-3.5 text-slate-200" fill="currentColor" />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: half ? "50%" : "100%" }}
                >
                  <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className="text-xs text-slate-500">({reviewCount})</span>
    </div>
  );
}

function MetalSwatches({ metals }: { metals: MetalOption[] }) {
  return (
    <div className="flex items-center gap-1.5 mt-2.5">
      {metals.map((metal) =>
        metal.isTextSwatch ? (
          <div
            key={metal.name}
            title={metal.name}
            className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[7px] font-semibold text-slate-500 bg-white"
          >
            Pt
          </div>
        ) : (
          <div
            key={metal.name}
            title={metal.name}
            className="w-4 h-4 rounded-full border border-slate-300"
            style={{ backgroundColor: metal.swatch }}
          />
        )
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-[#efece6]">
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <img
          src={product.hoverImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <div className="flex items-start justify-between gap-2 mt-3">
        <h3 className="text-sm font-serif text-slate-900 leading-snug">
          {product.title}
        </h3>
        <button
          type="button"
          onClick={() => setWishlisted((w) => !w)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="shrink-0 mt-0.5"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? "fill-blue-500 text-blue-500" : "text-blue-500"
            }`}
          />
        </button>
      </div>

      <p className="text-sm text-slate-800 mt-1.5">
        {product.price}{" "}
        {product.priceLabel && (
          <span className="text-slate-500">{product.priceLabel}</span>
        )}
      </p>

      <MetalSwatches metals={product.metals} />
      <StarRating rating={product.rating} reviewCount={product.reviewCount} />
    </div>
  );
}

export default function ProductCardGrid() {
  return (
    <div className="relative w-full bg-white px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <button
        type="button"
        className="fixed bottom-6 right-6 flex flex-col items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded shadow-sm text-[10px] font-semibold text-slate-700 gap-0.5"
      >
        <ChevronUp className="w-3 h-3" />
        TOP
      </button>
    </div>
  );
}
