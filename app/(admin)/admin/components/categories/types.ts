export type SubCategory = { id: number; name: string; slug: string; productCount: number };

export type Category = { id: number; name: string; slug: string; subcategories: SubCategory[] };

export const initialCategories: Category[] = [
    { id: 1, name: "Clothing", slug: "clothing", subcategories: [
        { id: 11, name: "Men", slug: "men", productCount: 24 },
        { id: 12, name: "Women", slug: "women", productCount: 38 },
        { id: 13, name: "Kids", slug: "kids", productCount: 12 },
    ] },
    { id: 2, name: "Shoes", slug: "shoes", subcategories: [
        { id: 21, name: "Sneakers", slug: "sneakers", productCount: 18 },
        { id: 22, name: "Boots", slug: "boots", productCount: 9 },
    ] },
    { id: 3, name: "Accessories", slug: "accessories", subcategories: [] },
];
