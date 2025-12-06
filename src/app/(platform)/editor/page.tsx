import Link from "next/link";
import { Code2 } from "lucide-react";
import { CodeEditor } from "./components/code-editor";
import { Button } from "@/components/ui/button";

export default function EditorPage() {
  return (
    <div className="flex flex-col h-screen bg-[#0A0E14]">
      {/* Navigation */}
      <nav className="border-b border-[#2D3340] bg-[#14181F]/80 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Code2 className="w-5 h-5 text-[#6C63FF]" />
              <span className="text-lg font-bold font-mono text-[#E6E8EB]">
                FlashCode
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#ACB2BD] hover:text-[#E6E8EB] hover:bg-[#1C2229] text-sm"
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#ACB2BD] hover:text-[#E6E8EB] hover:bg-[#1C2229] text-sm"
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Editor */}
      <div className="flex-1 flex overflow-hidden">
        <CodeEditor />
      </div>
    </div>
  );
}
