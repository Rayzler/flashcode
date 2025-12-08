"use client";

import { useState } from "react";
import { createSnippet } from "@/app/actions/snippets";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface SaveSnippetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  code: string;
  language: string;
}

export function SaveSnippetDialog({
  open,
  onOpenChange,
  code,
  language
}: SaveSnippetDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setError(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isLoading) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await createSnippet({
      title: title.trim(),
      code,
      language,
      description: description.trim() || undefined
    });

    if (result.success) {
      resetForm();
      onOpenChange(false);
    } else {
      setError(result.error || "Failed to save snippet");
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#14181F] border-[#2D3340] text-[#E6E8EB]">
        <DialogHeader>
          <DialogTitle>Save Snippet</DialogTitle>
          <DialogDescription className="text-[#ACB2BD]">
            Save your code to access it later from any device
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <div
              className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-md p-3"
              role="alert"
            >
              <p className="text-sm text-[#EF4444]">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="My awesome snippet"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              className="bg-[#1C2229] border-[#2D3340]"
              aria-invalid={!!error}
              aria-describedby={error ? "title-error" : undefined}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              placeholder="What does this code do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              className="bg-[#1C2229] border-[#2D3340]"
            />
          </div>

          <div className="text-xs text-[#ACB2BD]">
            Language: <span className="text-[#6C63FF]">{language}</span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-[#6C63FF] hover:bg-[#5B52FF]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Snippet"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
