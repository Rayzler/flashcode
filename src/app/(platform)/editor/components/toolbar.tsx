"use client";

import { Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./language-selector";
import { Language } from "@/types/editor";

interface ToolbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onRun: () => void;
  isExecuting: boolean;
}

export function Toolbar({
  language,
  onLanguageChange,
  onRun,
  isExecuting
}: ToolbarProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-[#14181F] border-b border-[#2D3340]">
      <LanguageSelector value={language} onChange={onLanguageChange} />

      <Button
        onClick={onRun}
        disabled={isExecuting}
        className="bg-[#4ADE80] hover:bg-[#3DCB6F] text-black font-medium"
        size="sm"
      >
        {isExecuting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Running...
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            Run
          </>
        )}
      </Button>

      <div className="ml-auto text-sm text-gray-400">Cmd+Enter to run</div>
    </div>
  );
}
