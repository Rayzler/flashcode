"use client";

import { Terminal } from "lucide-react";

interface OutputPanelProps {
  output: string;
  isExecuting: boolean;
}

export function OutputPanel({ output, isExecuting }: OutputPanelProps) {
  return (
    <div className="w-[38%] bg-[#14181F] border-l border-[#2D3340] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-[#2D3340]">
        <Terminal className="w-4 h-4 text-[#4ADE80]" />
        <span className="text-sm font-medium text-gray-200">Output</span>
      </div>

      {/* Output Content */}
      <div className="flex-1 p-4 overflow-auto">
        {isExecuting ? (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="animate-pulse">Executing...</div>
          </div>
        ) : output ? (
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
            {output}
          </pre>
        ) : (
          <div className="text-gray-500 text-sm">
            Click &quot;Run&quot; or press Cmd+Enter to execute your code
          </div>
        )}
      </div>
    </div>
  );
}
