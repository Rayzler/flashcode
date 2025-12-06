"use client";

import { Terminal, Clock } from "lucide-react";

interface OutputPanelProps {
  output: string;
  isExecuting: boolean;
  executionTime?: number | null;
}

export function OutputPanel({
  output,
  isExecuting,
  executionTime
}: OutputPanelProps) {
  return (
    <div className="w-[38%] bg-[#14181F] border-l border-[#2D3340] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2D3340] bg-[#0A0E14]/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#4ADE80]" />
          <span className="text-sm font-semibold text-[#E6E8EB]">Output</span>
        </div>

        {executionTime !== null && executionTime !== undefined && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1C2229] border border-[#2D3340] rounded text-xs text-[#4ADE80]">
            <Clock className="w-3 h-3" />
            <span className="font-mono">{executionTime.toFixed(0)}ms</span>
          </div>
        )}
      </div>

      {/* Output Content */}
      <div className="flex-1 p-4 overflow-auto">
        {isExecuting ? (
          <div className="flex items-center gap-3 text-[#ACB2BD]">
            <div className="flex gap-1">
              <span className="animate-bounce text-[#4ADE80]">●</span>
              <span
                className="animate-bounce text-[#4ADE80]"
                style={{ animationDelay: "0.15s" }}
              >
                ●
              </span>
              <span
                className="animate-bounce text-[#4ADE80]"
                style={{ animationDelay: "0.3s" }}
              >
                ●
              </span>
            </div>
            <span className="text-sm">Executing code...</span>
          </div>
        ) : output ? (
          <pre className="text-sm text-[#E6E8EB] font-mono whitespace-pre-wrap leading-relaxed">
            {output}
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <Terminal className="w-12 h-12 text-[#2D3340] mb-4" />
            <p className="text-[#ACB2BD] text-sm mb-2">No output yet</p>
            <p className="text-[#ACB2BD]/60 text-xs">
              Click{" "}
              <span className="text-[#4ADE80] font-semibold">Run Code</span> or
              press{" "}
              <kbd className="px-1.5 py-0.5 bg-[#1C2229] border border-[#2D3340] rounded text-[10px] font-mono">
                Cmd+Enter
              </kbd>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
