"use client";

import { useEffect, useState } from "react";
import { getMySnippets, deleteSnippet } from "@/app/actions/snippets";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Code2 } from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SnippetsListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoadSnippet: (snippet: Snippet) => void;
}

export function SnippetsListDialog({
  open,
  onOpenChange,
  onLoadSnippet
}: SnippetsListDialogProps) {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    let isMounted = true;
    setIsLoading(true);

    getMySnippets().then((result) => {
      if (isMounted) {
        if (result.success && result.snippets) {
          setSnippets(result.snippets as Snippet[]);
        }
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [open]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this snippet?")) return;

    setDeletingId(id);
    const result = await deleteSnippet(id);
    if (result.success) {
      setSnippets((prev) => prev.filter((s) => s.id !== id));
    }
    setDeletingId(null);
  };

  const handleLoad = (snippet: Snippet) => {
    onLoadSnippet(snippet);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#14181F] border-[#2D3340] text-[#E6E8EB] max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>My Snippets</DialogTitle>
          <DialogDescription className="text-[#ACB2BD]">
            {snippets.length} saved snippet{snippets.length !== 1 ? "s" : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[60vh] space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-[#6C63FF]" />
            </div>
          ) : snippets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Code2 className="w-12 h-12 text-[#2D3340] mb-4" />
              <p className="text-[#ACB2BD] mb-2">No snippets yet</p>
              <p className="text-sm text-[#6C7380]">
                Save your first snippet to see it here
              </p>
            </div>
          ) : (
            snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="flex items-center justify-between p-4 bg-[#1C2229] border border-[#2D3340] rounded-lg hover:border-[#6C63FF]/50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#E6E8EB] truncate">
                    {snippet.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-[#6C63FF]">
                      {snippet.language}
                    </span>
                    <span className="text-xs text-[#ACB2BD]">
                      Updated {formatDistanceToNow(new Date(snippet.updatedAt))}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLoad(snippet)}
                    className="text-[#4ADE80] hover:text-[#3DCB6F] hover:bg-[#4ADE80]/10"
                  >
                    Load
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(snippet.id)}
                    disabled={deletingId === snippet.id}
                    className="text-[#EF4444] hover:text-[#DC2626] hover:bg-[#EF4444]/10"
                  >
                    {deletingId === snippet.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
