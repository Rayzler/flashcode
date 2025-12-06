"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Toolbar } from "./toolbar";
import { OutputPanel } from "./output-panel";
import { Language, STARTER_CODE } from "@/types/editor";

export function CodeEditor() {
  const [code, setCode] = useState(STARTER_CODE.javascript);
  const [language, setLanguage] = useState<Language>("javascript");
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setCode(STARTER_CODE[newLang]);
  };

  const handleRun = async () => {
    setIsExecuting(true);
    // TODO: Connect to executeCode Server Action (next step)
    setOutput("Execution not implemented yet...");
    setTimeout(() => setIsExecuting(false), 1000);
  };

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
      <OutputPanel output={output} isExecuting={isExecuting} />
    </div>
  );
}
