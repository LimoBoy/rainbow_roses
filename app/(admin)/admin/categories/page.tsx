"use client";

import { useState } from "react";
import { AddCategoryDialog } from "@/app/(admin)/admin/components/categories/add-category-dialog";
import { AddSubcategoryDialog } from "@/app/(admin)/admin/components/categories/add-subcategory-dialog";
import { CategoriesList } from "@/app/(admin)/admin/components/categories/categories-list";
import { initialCategories, type Category } from "@/app/(admin)/admin/components/categories/types";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [expanded, setExpanded] = useState<number[]>([1, 2]);
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [subcategoryDialogOpen, setSubcategoryDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [categoryName, setCategoryName] = useState("");
    const [subcategoryName, setSubcategoryName] = useState("");

    const toggleCategory = (id: number) => setExpanded((current) =>
        current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

    const addCategory = () => {
        const name = categoryName.trim();
        if (!name) return;
        setCategories((current) => [...current, {
            id: Date.now(), name, slug: name.toLowerCase().replace(/\s+/g, "-"), subcategories: [],
        }]);
        setCategoryName("");
        setCategoryDialogOpen(false);
    };

    const addSubcategory = () => {
        const name = subcategoryName.trim();
        if (!name || !selectedCategory) return;
        setCategories((current) => current.map((category) => category.id === selectedCategory.id
            ? { ...category, subcategories: [...category.subcategories, {
                id: Date.now(), name, slug: name.toLowerCase().replace(/\s+/g, "-"), productCount: 0,
            }] }
            : category,
        ));
        setSubcategoryName("");
        setSubcategoryDialogOpen(false);
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Manage your product categories and subcategories.</p>
                </div>
                <AddCategoryDialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen} name={categoryName} onNameChange={setCategoryName} onSubmit={addCategory} />
            </div>
            <CategoriesList
                categories={categories}
                expandedCategoryIds={expanded}
                onToggleCategory={toggleCategory}
                onAddSubcategory={(category) => {
                    setSelectedCategory(category);
                    setSubcategoryName("");
                    setSubcategoryDialogOpen(true);
                }}
            />
            <AddSubcategoryDialog open={subcategoryDialogOpen} onOpenChange={setSubcategoryDialogOpen} category={selectedCategory} name={subcategoryName} onNameChange={setSubcategoryName} onSubmit={addSubcategory} />
        </div>
    );
}
