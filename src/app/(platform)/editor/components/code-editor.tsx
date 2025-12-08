"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Toolbar } from "./toolbar";
import { OutputPanel } from "./output-panel";
import { SaveSnippetDialog } from "./save-snippet-dialog";
import { SnippetsListDialog } from "./snippets-list-dialog";
import { Language, STARTER_CODE } from "@/types/editor";
import { executeCode } from "@/app/actions/code-execution";

export function CodeEditor() {
  const [code, setCode] = useState(STARTER_CODE.javascript);
  const [language, setLanguage] = useState<Language>("javascript");
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  // Dialogs state
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showSnippetsDialog, setShowSnippetsDialog] = useState(false);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setCode(STARTER_CODE[newLang]);
    setOutput("");
    setExecutionTime(null);
  };

  const handleRun = async () => {
    setIsExecuting(true);
    setOutput("");
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

  const handleLoadSnippet = (snippet: { code: string; language: string }) => {
    setCode(snippet.code);
    setLanguage(snippet.language as Language);
    setOutput("");
    setExecutionTime(null);
  };

  return (
    <>
      <div className="flex w-full">
        {/* Editor Section - 60% */}
        <div className="flex-1 flex flex-col">
          <Toolbar
            language={language}
            onLanguageChange={handleLanguageChange}
            onRun={handleRun}
            onSave={() => setShowSaveDialog(true)}
            onLoadSnippets={() => setShowSnippetsDialog(true)}
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

      {/* Dialogs */}
      <SaveSnippetDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        code={code}
        language={language}
      />

      <SnippetsListDialog
        open={showSnippetsDialog}
        onOpenChange={setShowSnippetsDialog}
        onLoadSnippet={handleLoadSnippet}
      />
    </>
  );
}
