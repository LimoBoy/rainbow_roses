"use client";

import { useState } from "react";
import Image from "next/image";
import {
    ChevronDown,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";


const CATEGORIES = [
    {
        id: "Rings",
        image: "/images/filters/Rings.58a37.jpg",
    },
    {
        id: "Earrings",
        image: "/images/filters/Earrings.44b59.jpg",
    },
    {
        id: "Bracelets",
        image: "/images/filters/Bracelets.d68ad.jpg",
    },
    {
        id: "Necklaces",
        image: "/images/filters/Necklaces.e5191.jpg",
    },
    {
        id: "Collections",
        image: "/images/filters/Collections.412c1.jpg",
    },
    {
        id: "Diamond Essentials",
        image: "/images/filters/DiamondEssentials.dc86b.jpg",
    },
];


const FILTERS: Record<string, string[]> = {

    Rings: [
        "Gender",
        "Ring Style",
        "Ring Size",
        "Stone Shape",
        "Total Carat",
        "Diamond",
        "Gemstones",
        "Pearls",
        "Birthstones",
        "Metal",
        "Ring Width",
        "Price"
    ],

    Earrings: [
        "Gender",
        "Earring Style",
        "Stone Shape",
        "Total Carat",
        "Diamond",
        "Gemstones",
        "Pearls",
        "Birthstones",
        "Metal",
        "Price"
    ],

    Bracelets: [
        "Gender",
        "Bracelet Style",
        "Bracelet Length",
        "Stone Shape",
        "Total Carat",
        "Diamond",
        "Gemstones",
        "Pearls",
        "Birthstones",
        "Metal",
        "Price"
    ],

    Necklaces: [
        "Gender",
        "Necklace Style",
        "Chain Length",
        "Pendant Type",
        "Stone Shape",
        "Total Carat",
        "Diamond",
        "Gemstones",
        "Pearls",
        "Birthstones",
        "Metal",
        "Price"
    ],

    Collections: [
        "Collection",
        "Metal",
        "Gemstones",
        "Price"
    ],

    "Diamond Essentials": [
        "Diamond Shape",
        "Carat",
        "Cut",
        "Color",
        "Clarity",
        "Certification",
        "Price"
    ]

};



const CHECKBOXES: Record<string, string[]> = {

    Rings: [
        "Plain Metal",
        "On Sale",
        "New Arrivals",
        "Engravable"
    ],

    Earrings: [
        "Plain Metal",
        "On Sale",
        "New Arrivals"
    ],

    Bracelets: [
        "Plain Metal",
        "On Sale",
        "New Arrivals",
        "Engravable"
    ],

    Necklaces: [
        "Plain Metal",
        "On Sale",
        "New Arrivals",
        "Engravable"
    ],

    Collections: [
        "On Sale",
        "New Arrivals"
    ],

    "Diamond Essentials": [
        "On Sale",
        "New Arrivals"
    ]

};



const OPTIONS: Record<string, string[]> = {


    Gender: [
        "Women",
        "Men",
        "Unisex"
    ],


    "Ring Style": [
        "Solitaire",
        "Halo",
        "Eternity",
        "Stackable",
        "Signet"
    ],


    "Ring Size": [
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
    ],


    "Earring Style": [
        "Studs",
        "Hoops",
        "Drops",
        "Huggies",
        "Chandelier"
    ],


    "Stone Shape": [
        "Round",
        "Oval",
        "Princess",
        "Emerald",
        "Pear",
        "Marquise"
    ],


    "Total Carat": [
        "Under 0.5ct",
        "0.5–1ct",
        "1–2ct",
        "2ct+"
    ],


    Diamond: [
        "Natural",
        "Lab Grown"
    ],


    Gemstones: [
        "Sapphire",
        "Emerald",
        "Ruby",
        "Amethyst",
        "Topaz"
    ],


    Pearls: [
        "Freshwater",
        "Akoya",
        "Tahitian",
        "South Sea"
    ],


    Metal: [
        "Yellow Gold",
        "White Gold",
        "Rose Gold",
        "Platinum",
        "Sterling Silver"
    ],


    Price: [
        "Under $500",
        "$500–$1,500",
        "$1,500–$5,000",
        "$5,000+"
    ],


    Collection: [
        "Signature",
        "Heritage",
        "Modern Muse",
        "Bridal"
    ]

};



export default function JewelryFilters() {


    const [category, setCategory] = useState("Rings");


    const [open, setOpen] = useState<string | null>(null);


    const [selected, setSelected] = useState<
        Record<string, string[] | boolean>
    >({});




    function toggleOption(
        filter: string,
        value: string
    ) {


        const current =
            (selected[filter] as string[]) || [];


        const updated =
            current.includes(value)
                ?
                current.filter(x => x !== value)
                :
                [
                    ...current,
                    value
                ];


        const copy = {
            ...selected
        };


        if (updated.length)
            copy[filter] = updated;
        else
            delete copy[filter];


        setSelected(copy);

    }





    function toggleCheckbox(
        name: string
    ) {

        const copy = {
            ...selected
        };


        if (copy[name])
            delete copy[name];
        else
            copy[name] = true;


        setSelected(copy);

    }





    function removeFilter(
        name: string,
        value?: string
    ) {


        const copy = {
            ...selected
        };



        if (value) {

            const values =
                copy[name] as string[];


            const updated =
                values.filter(
                    x => x !== value
                );


            if (updated.length)
                copy[name] = updated;
            else
                delete copy[name];


        }
        else {

            delete copy[name];

        }



        setSelected(copy);

    }





    function resetFilters() {

        setSelected({});

    }




    const hasFilters =
        Object.keys(selected).length > 0;




    return (

        <section
            className="
bg-[#FAF8F3]
p-8
text-[#1B2A4A]
"
        >


            <h1
                className="
text-3xl
font-normal
mb-2
"
            >
                Jewelry
            </h1>


            <p
                className="
text-sm
text-[#3A4A6B]
max-w-xl
leading-6
mb-6
"
            >
                Search our unrivaled selection of expertly crafted fine jewelry for the perfect gifts.
                Discover silver earrings, classic pearls, diamond necklaces and more.
            </p>





            {/* Categories */}

            <div
                className="
flex
gap-4
overflow-x-auto
scrollbar-hide
mb-8
"
            >


                {
                    CATEGORIES.map(item => (


                        <button

                            key={item.id}

                            onClick={() => {

                                setCategory(item.id);
                                setSelected({});

                            }}

                            className="
w-[150px]
shrink-0
text-left
"

                        >


                            <div
                                className={`
relative
h-[150px]
w-[150px]
overflow-hidden
rounded-lg
border-2

transition

${category === item.id
                                        ?
                                        "border-[#1B2A4A]"
                                        :
                                        "border-transparent"
                                    }

`}
                            >


                                <Image

                                    src={item.image}

                                    alt={item.id}

                                    fill

                                    className="
object-cover
"

                                />


                            </div>


                            <p
                                className="
mt-2
text-sm
"
                            >
                                {item.id}
                            </p>


                        </button>


                    ))
                }


            </div>





            {/* Filters */}

            <div
                className="
flex
flex-wrap
gap-2
"
            >


                {
                    FILTERS[category].map(filter => {


                        const values =
                            (selected[filter] as string[]) || [];


                        const active =
                            values.length > 0;



                        return (

                            <div
                                key={filter}
                                className="
relative
"
                            >


                                <Button

                                    variant="outline"

                                    className={`
rounded-full
border-[#DAD5C8]

${active
                                            ?
                                            "bg-[#F2F0E9] border-[#1B2A4A]"
                                            :
                                            "bg-white"
                                        }

`}

                                    onClick={() => setOpen(
                                        open === filter
                                            ?
                                            null
                                            :
                                            filter
                                    )}

                                >


                                    {filter}


                                    {
                                        active &&
                                        ` (${values.length})`
                                    }


                                    <ChevronDown
                                        size={14}
                                    />


                                </Button>





                                {
                                    open === filter &&

                                    <div
                                        className="
absolute
top-12
left-0
z-30
min-w-[190px]
rounded-lg
border
bg-white
shadow-lg
p-3
"
                                    >


                                        {
                                            (OPTIONS[filter] || []).map(option => (


                                                <label

                                                    key={option}

                                                    className="
flex
items-center
gap-2
p-2
rounded
text-sm
hover:bg-gray-50
cursor-pointer
"

                                                >


                                                    <Checkbox

                                                        checked={
                                                            values.includes(option)
                                                        }

                                                        onCheckedChange={() =>
                                                            toggleOption(
                                                                filter,
                                                                option
                                                            )
                                                        }

                                                    />


                                                    {option}


                                                </label>


                                            ))
                                        }


                                    </div>

                                }


                            </div>


                        )

                    })
                }




                {
                    CHECKBOXES[category].map(item => (


                        <label

                            key={item}

                            className={`
flex
items-center
gap-2
px-4
py-2
rounded-full
border
cursor-pointer

${selected[item]
                                    ?
                                    "bg-[#F2F0E9]"
                                    :
                                    "bg-white"
                                }

`}

                        >


                            <Checkbox

                                checked={
                                    !!selected[item]
                                }

                                onCheckedChange={() =>
                                    toggleCheckbox(item)
                                }

                            />


                            {item}


                        </label>


                    ))
                }


            </div>







            {/* Applied */}

            <div
                className="
flex
flex-wrap
items-center
gap-2
mt-6
"
            >


                <div
                    className="
flex
items-center
gap-2
rounded-full
bg-[#EEF1F6]
px-3
py-1.5
text-sm
"
                >

                    {category}

                    <X

                        size={14}

                        className="cursor-pointer"

                        onClick={() => {
                            setCategory("Rings");
                            setSelected({});
                        }}

                    />

                </div>





                {
                    Object.entries(selected)
                        .flatMap(([key, value]) => {


                            if (value === true) {

                                return (

                                    <div
                                        key={key}
                                        className="
flex
items-center
gap-2
rounded-full
bg-[#EEF1F6]
px-3
py-1.5
text-sm
"
                                    >

                                        {key}

                                        <X
                                            size={14}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                removeFilter(key)
                                            }
                                        />

                                    </div>

                                )

                            }


                            return (value as string[]).map(v => (

                                <div
                                    key={key + v}
                                    className="
flex
items-center
gap-2
rounded-full
bg-[#EEF1F6]
px-3
py-1.5
text-sm
"
                                >

                                    {key}: {v}


                                    <X
                                        size={14}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            removeFilter(key, v)
                                        }
                                    />

                                </div>

                            ))


                        })
                }




                {
                    hasFilters &&

                    <button

                        onClick={resetFilters}

                        className="
text-sm
font-semibold
underline
ml-2
"
                    >
                        Reset filters
                    </button>

                }


            </div>




            <p
                className="
mt-4
text-sm
text-[#3A4A6B]
"
            >

                Showing {category}
                {
                    hasFilters &&
                    ` filtered by ${Object.keys(selected).length} selection(s)`
                }

            </p>


        </section>

    )

}