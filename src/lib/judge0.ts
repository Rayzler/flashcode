// Language IDs según Judge0 API
export const JUDGE0_LANGUAGE_IDS = {
  javascript: 63, // Node.js
  python: 71, // Python 3
  java: 62, // Java
  cpp: 54, // C++ (GCC 9.2.0)
  go: 60 // Go
} as const;

export type Judge0Language = keyof typeof JUDGE0_LANGUAGE_IDS;

interface Judge0ResultResponse {
  status: {
    id: number;
    description: string;
  };
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  time: string;
  memory: number;
}

export interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
  executionTime?: number; // ms
  memory?: number; // KB
}

/**
 * Submit code to Judge0 for execution
 */
export async function executeCode(
  code: string,
  language: Judge0Language
): Promise<ExecutionResult> {
  try {
    const languageId = JUDGE0_LANGUAGE_IDS[language];

    // Step 1: Submit code
    const submissionResponse = await fetch(
      `https://${process.env.RAPIDAPI_HOST}/submissions?base64_encoded=true&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
          "X-RapidAPI-Host": process.env.RAPIDAPI_HOST!
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: Buffer.from(code).toString("base64"),
          stdin: ""
        })
      }
    );

    if (!submissionResponse.ok) {
      throw new Error(
        `Judge0 submission failed: ${submissionResponse.statusText}`
      );
    }

    const result: Judge0ResultResponse = await submissionResponse.json();

    // Parse result
    return parseJudge0Result(result);
  } catch (error) {
    console.error("Judge0 execution error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

/**
 * Parse Judge0 result into our format
 */
function parseJudge0Result(result: Judge0ResultResponse): ExecutionResult {
  const statusId = result.status.id;

  // Status ID meanings:
  // 3 = Accepted (success)
  // 4 = Wrong Answer
  // 5 = Time Limit Exceeded
  // 6 = Compilation Error
  // 11 = Runtime Error (NZEC)
  // 13 = Internal Error
  // 14 = Exec Format Error

  // Decode base64 outputs
  const stdout = result.stdout
    ? Buffer.from(result.stdout, "base64").toString()
    : null;
  const stderr = result.stderr
    ? Buffer.from(result.stderr, "base64").toString()
    : null;
  const compileOutput = result.compile_output
    ? Buffer.from(result.compile_output, "base64").toString()
    : null;

  // Success case
  if (statusId === 3) {
    return {
      success: true,
      output: stdout || "(no output)",
      executionTime: parseFloat(result.time) * 1000, // Convert to ms
      memory: result.memory
    };
  }

  // Error cases
  let errorMessage = "";

  if (statusId === 6 && compileOutput) {
    // Compilation error
    errorMessage = `Compilation Error:\n${compileOutput}`;
  } else if (stderr) {
    // Runtime error with stderr
    errorMessage = stderr;
  } else if (result.message) {
    // Other errors
    errorMessage = result.message;
  } else {
    errorMessage = `Execution failed: ${result.status.description}`;
  }

  return {
    success: false,
    error: errorMessage,
    executionTime: parseFloat(result.time) * 1000,
    memory: result.memory
  };
}
