import {ShoppingBag, Info} from "lucide-react";
import Link from "next/link";

export default function Orders() {
    const orders = [];
    const categories = [
        "ENGAGEMENT RINGS",
        "ANNIVERSARY RINGS",
        "WEDDING RINGS",
        "FINE JEWELRY",
        "DIAMONDS",
        "LAB DIAMONDS",
    ];

    return (
        <>
            <div className="flex w-full flex-col items-center px-4 py-12 text-[#0c1636]">

                {/* Empty orders icon */}
                <div className="relative mb-8 flex h-[130px] w-[130px] items-center justify-center">
                    {/* Soft background */}
                    <div className="absolute inset-4 rounded-full bg-[#f8f8ff]"/>

                    <div className="relative">
                        <ShoppingBag
                            size={96}
                            strokeWidth={1.8}
                            className="text-[#0c1636]"
                        />

                        {/* 0 badge */}
                        <div
                            className="absolute -right-[10px] bottom-[2px] flex h-10 w-10 items-center justify-center rounded-full bg-[#0c1636] text-sm font-medium text-white">
                            0
                        </div>
                    </div>
                </div>

                {orders.length === 0 && (
                    <>
                        <h2 className="mb-5 text-[24px] font-semibold">
                            No Orders Yet
                        </h2>

                        <p className="mb-12 max-w-[450px] text-center text-[20px] leading-[1.35]">
                            Start exploring our amazing products and
                            <br />
                            make your first purchase!
                        </p>

                        <div className="grid w-full max-w-[780px] grid-cols-3 gap-[14px]">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className="h-[56px] cursor-pointer rounded-[5px] border border-[#0c1636] bg-white text-[16px] font-normal transition-colors hover:bg-[#0c1636] hover:text-white"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="mt-20 flex items-center gap-2 text-[18px]">
                            <Info size={21} strokeWidth={2} />

                            <span>Need help or facing an issue?</span>

                            <Link
                                href="/contact"
                                className="underline underline-offset-2 hover:no-underline"
                            >
                                Contact Us
                            </Link>

                            <span>for assistance.</span>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}