import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Category } from "./types";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; category: Category | null; name: string; onNameChange: (name: string) => void; onSubmit: () => void };

export function AddSubcategoryDialog({ open, onOpenChange, category, name, onNameChange, onSubmit }: Props) {
    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader><DialogTitle>Add subcategory</DialogTitle><DialogDescription>Add a subcategory to <strong>{category?.name}</strong>.</DialogDescription></DialogHeader>
            <div className="space-y-4 py-4"><div className="space-y-2">
                <Label htmlFor="subcategory-name">Subcategory name</Label>
                <Input id="subcategory-name" placeholder="e.g. Sneakers" value={name} onChange={(event) => onNameChange(event.target.value)} />
            </div></div>
            <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={onSubmit}>Create subcategory</Button></DialogFooter>
        </DialogContent>
    </Dialog>;
}
