"use server";

import { executeCode as executeOnJudge0 } from "@/lib/judge0";
import type { Judge0Language } from "@/lib/judge0";

export interface ExecuteCodeInput {
  code: string;
  language: string;
}

export interface ExecuteCodeOutput {
  success: boolean;
  output?: string;
  error?: string;
  executionTime?: number;
  memory?: number;
}

/**
 * Execute code on Judge0
 * MVP: No authentication, basic rate limiting
 */
export async function executeCode(
  input: ExecuteCodeInput
): Promise<ExecuteCodeOutput> {
  const { code, language } = input;

  // Validation
  if (!code || code.trim().length === 0) {
    return {
      success: false,
      error: "Code cannot be empty"
    };
  }

  if (!isValidLanguage(language)) {
    return {
      success: false,
      error: `Unsupported language: ${language}`
    };
  }

  // TODO: Add rate limiting (next step)
  // For now, execute directly

  try {
    const result = await executeOnJudge0(code, language as Judge0Language);
    return result;
  } catch (error) {
    console.error("Code execution failed:", error);
    return {
      success: false,
      error: "Failed to execute code. Please try again."
    };
  }
}

function isValidLanguage(language: string): boolean {
  return ["javascript", "python", "java", "cpp", "go"].includes(language);
}
