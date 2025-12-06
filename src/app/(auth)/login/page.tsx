import Link from "next/link";
import { Code2 } from "lucide-react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0A0E14] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#2D3340] bg-[#14181F]">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Code2 className="w-5 h-5 text-[#6C63FF]" />
            <span className="text-lg font-bold font-mono text-[#E6E8EB]">
              FlashCode
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#E6E8EB] mb-2">
              Welcome back
            </h1>
            <p className="text-[#ACB2BD]">Sign in to continue coding</p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Sign up link */}
          <p className="text-center text-sm text-[#ACB2BD]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#6C63FF] hover:text-[#5B52FF] font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
