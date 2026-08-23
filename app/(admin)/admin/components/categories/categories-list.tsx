import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryRow } from "./category-row";
import type { Category } from "./types";

type Props = { categories: Category[]; expandedCategoryIds: number[]; onToggleCategory: (id: number) => void; onAddSubcategory: (category: Category) => void };

export function CategoriesList({ categories, expandedCategoryIds, onToggleCategory, onAddSubcategory }: Props) {
    return <Card>
        <CardHeader className="border-b"><CardTitle className="text-base">Product categories</CardTitle></CardHeader>
        <CardContent className="p-0"><div className="divide-y">
            {categories.map((category) => <CategoryRow key={category.id} category={category} isExpanded={expandedCategoryIds.includes(category.id)} onToggle={() => onToggleCategory(category.id)} onAddSubcategory={() => onAddSubcategory(category)} />)}
        </div></CardContent>
    </Card>;
}
