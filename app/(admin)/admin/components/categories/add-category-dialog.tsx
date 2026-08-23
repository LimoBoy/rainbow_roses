import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; name: string; onNameChange: (name: string) => void; onSubmit: () => void };

export function AddCategoryDialog({ open, onOpenChange, name, onNameChange, onSubmit }: Props) {
    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger render={<Button />}><Plus className="mr-2 h-4 w-4" />Add Category</DialogTrigger>
        <DialogContent>
            <DialogHeader><DialogTitle>Add category</DialogTitle><DialogDescription>Create a new product category.</DialogDescription></DialogHeader>
            <div className="space-y-4 py-4"><div className="space-y-2">
                <Label htmlFor="category-name">Category name</Label>
                <Input id="category-name" placeholder="e.g. Clothing" value={name} onChange={(event) => onNameChange(event.target.value)} />
            </div></div>
            <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={onSubmit}>Create category</Button></DialogFooter>
        </DialogContent>
    </Dialog>;
}
