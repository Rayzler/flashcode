"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Toolbar } from "./toolbar";
import { OutputPanel } from "./output-panel";
import { Language, STARTER_CODE } from "@/types/editor";
import { executeCode } from "@/app/actions/code-execution";

export function CodeEditor() {
  const [code, setCode] = useState(STARTER_CODE.javascript);
  const [language, setLanguage] = useState<Language>("javascript");
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setCode(STARTER_CODE[newLang]);
    setOutput(""); // Clear output when changing language
    setExecutionTime(null);
  };

  const handleRun = async () => {
    setIsExecuting(true);
    setOutput(""); // Clear previous output
    setExecutionTime(null);

    try {
      const result = await executeCode({
        code,
        language
      });

      if (result.success) {
        setOutput(result.output || "(no output)");
        setExecutionTime(result.executionTime || null);
      } else {
        setOutput(`Error:\n${result.error}`);
      }
    } catch (error) {
      setOutput(
        `Failed to execute code: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsExecuting(false);
    }
  };

  // TODO: Add keyboard shortcut (Cmd+Enter)
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
  //       e.preventDefault()
  //       handleRun()
  //     }
  //   }
  //   window.addEventListener('keydown', handleKeyDown)
  //   return () => window.removeEventListener('keydown', handleKeyDown)
  // }, [code, language])

  return (
    <div className="flex w-full">
      {/* Editor Section - 60% */}
      <div className="flex-1 flex flex-col">
        <Toolbar
          language={language}
          onLanguageChange={handleLanguageChange}
          onRun={handleRun}
          isExecuting={isExecuting}
        />
        <Editor
          height="100%"
          language={language === "cpp" ? "cpp" : language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2
          }}
        />
      </div>

      {/* Output Section - 38% */}
      <OutputPanel
        output={output}
        isExecuting={isExecuting}
        executionTime={executionTime}
      />
    </div>
  );
}
