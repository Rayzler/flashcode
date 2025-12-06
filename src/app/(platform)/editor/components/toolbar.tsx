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
    <div className="flex items-center gap-4 px-4 py-3 bg-[#14181F] border-b border-[#2D3340]">
      <LanguageSelector value={language} onChange={onLanguageChange} />

      <Button
        onClick={onRun}
        disabled={isExecuting}
        className="bg-[#4ADE80] hover:bg-[#3DCB6F] text-black font-medium shadow-sm disabled:opacity-50"
        size="sm"
      >
        {isExecuting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Running...
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2 fill-black" />
            Run Code
          </>
        )}
      </Button>

      <div className="ml-auto text-xs text-[#ACB2BD] font-mono">
        <kbd className="px-2 py-1 bg-[#1C2229] border border-[#2D3340] rounded text-[10px]">
          Cmd+Enter
        </kbd>
      </div>
    </div>
  );
}
