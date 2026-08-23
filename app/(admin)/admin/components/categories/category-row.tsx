import { ChevronDown, ChevronRight, Folder, FolderOpen, MoreHorizontal, Package, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Category } from "./types";

type Props = { category: Category; isExpanded: boolean; onToggle: () => void; onAddSubcategory: () => void };

function ActionsMenu() {
    return <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}><MoreHorizontal className="h-4 w-4" /></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>;
}

export function CategoryRow({ category, isExpanded, onToggle, onAddSubcategory }: Props) {
    const productCount = category.subcategories.reduce((total, subcategory) => total + subcategory.productCount, 0);
    return <div>
        <div className="flex items-center gap-3 px-6 py-4 hover:bg-muted/40">
            <button type="button" onClick={onToggle} className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {isExpanded ? <FolderOpen className="h-5 w-5 text-muted-foreground" /> : <Folder className="h-5 w-5 text-muted-foreground" />}
            <div className="min-w-0 flex-1"><div className="font-medium">{category.name}</div><div className="text-xs text-muted-foreground">/{category.slug}</div></div>
            <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex"><Package className="h-4 w-4" />{productCount}</div>
            <Button variant="outline" size="sm" onClick={onAddSubcategory}><Plus className="mr-1 h-4 w-4" />Subcategory</Button>
            <ActionsMenu />
        </div>
        {isExpanded && category.subcategories.map((subcategory) => <div key={subcategory.id} className="flex items-center gap-3 border-t bg-muted/20 py-3 pl-20 pr-6">
            <div className="h-px w-4 bg-border" />
            <div className="min-w-0 flex-1"><div className="text-sm font-medium">{subcategory.name}</div><div className="text-xs text-muted-foreground">/{subcategory.slug}</div></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Package className="h-4 w-4" />{subcategory.productCount}</div>
            <ActionsMenu />
        </div>)}
        {isExpanded && category.subcategories.length === 0 && <div className="border-t bg-muted/20 px-20 py-5">
            <p className="text-sm text-muted-foreground">No subcategories yet.</p>
            <Button variant="link" className="h-auto p-0" onClick={onAddSubcategory}>Add your first subcategory</Button>
        </div>}
    </div>;
}
