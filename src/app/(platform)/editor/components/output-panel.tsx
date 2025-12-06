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
      <div className="flex items-center justify-between p-4 border-b border-[#2D3340]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#4ADE80]" />
          <span className="text-sm font-medium text-gray-200">Output</span>
        </div>

        {executionTime && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{executionTime.toFixed(0)}ms</span>
          </div>
        )}
      </div>

      {/* Output Content */}
      <div className="flex-1 p-4 overflow-auto">
        {isExecuting ? (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="flex gap-1">
              <span className="animate-bounce">.</span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                .
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                .
              </span>
            </div>
            <span>Executing</span>
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
