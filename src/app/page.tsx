import Link from "next/link";
import { Code2, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0E14] text-[#E6E8EB]">
      {/* Navigation */}
      <nav className="border-b border-[#2D3340] bg-[#14181F]/50 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-[#6C63FF]" />
              <span className="text-xl font-bold font-mono">FlashCode</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/editor">
                <Button
                  variant="ghost"
                  className="text-[#E6E8EB] hover:text-white hover:bg-[#1C2229]"
                >
                  Editor
                </Button>
              </Link>
              <Link href="/editor">
                <Button className="bg-[#6C63FF] hover:bg-[#5B52FF] text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14181F] border border-[#2D3340] text-sm text-[#ACB2BD] mb-8">
              <Zap className="w-4 h-4 text-[#4ADE80]" />
              <span>Lightning-fast code execution</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Code, Run, Learn.{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6C63FF] to-[#4ADE80]">
                Instantly.
              </span>
            </h1>
            
            <p className="text-xl text-[#ACB2BD] mb-10 leading-relaxed">
              A modern online code editor for developers. Write, execute, and test code
              in multiple languages without leaving your browser.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/editor">
                <Button
                  size="lg"
                  className="bg-[#4ADE80] hover:bg-[#3DCB6F] text-black font-medium text-lg px-8 py-6"
                >
                  Start Coding
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-[#2D3340] text-[#E6E8EB] hover:bg-[#14181F] text-lg px-8 py-6"
              >
                View Demo
              </Button>
            </div>
          </div>

          {/* Code Preview */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="bg-[#14181F] border border-[#2D3340] rounded-lg overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0A0E14] border-b border-[#2D3340]">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#4ADE80]" />
                <span className="ml-4 text-sm text-[#ACB2BD] font-mono">main.js</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <pre className="text-[#E6E8EB]">
                  <span className="text-[#C792EA]">function</span>{" "}
                  <span className="text-[#82AAFF]">greet</span>
                  <span className="text-[#89DDFF]">(</span>
                  <span className="text-[#F78C6C]">name</span>
                  <span className="text-[#89DDFF]">)</span>{" "}
                  <span className="text-[#89DDFF]">{"{"}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-[#C792EA]">return</span>{" "}
                  <span className="text-[#C3E88D]">{"`Hello, ${name}! Welcome to FlashCode.`"}</span>
                  <span className="text-[#89DDFF]">;</span>
                  {"\n"}
                  <span className="text-[#89DDFF]">{"}"}</span>
                  {"\n\n"}
                  <span className="text-[#82AAFF]">console</span>
                  <span className="text-[#89DDFF]">.</span>
                  <span className="text-[#82AAFF]">log</span>
                  <span className="text-[#89DDFF]">(</span>
                  <span className="text-[#82AAFF]">greet</span>
                  <span className="text-[#89DDFF]">(</span>
                  <span className="text-[#C3E88D]">&quot;Developer&quot;</span>
                  <span className="text-[#89DDFF]">));</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#14181F]/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Everything you need to code
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#14181F] border border-[#2D3340] rounded-lg p-8 hover:border-[#6C63FF] transition-colors">
              <div className="w-12 h-12 bg-[#6C63FF]/10 rounded-lg flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-[#6C63FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-Language Support</h3>
              <p className="text-[#ACB2BD]">
                Write and execute code in JavaScript, Python, C++, and more. Switch between
                languages instantly.
              </p>
            </div>

            <div className="bg-[#14181F] border border-[#2D3340] rounded-lg p-8 hover:border-[#4ADE80] transition-colors">
              <div className="w-12 h-12 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#4ADE80]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Execution</h3>
              <p className="text-[#ACB2BD]">
                Run your code with a single click. Get real-time output and error messages
                without delay.
              </p>
            </div>

            <div className="bg-[#14181F] border border-[#2D3340] rounded-lg p-8 hover:border-[#6C63FF] transition-colors">
              <div className="w-12 h-12 bg-[#6C63FF]/10 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-[#6C63FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Challenges & Learning</h3>
              <p className="text-[#ACB2BD]">
                Practice with coding challenges and improve your skills with interactive
                tutorials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to start coding?
          </h2>
          <p className="text-xl text-[#ACB2BD] mb-10">
            Join thousands of developers learning and building with FlashCode.
          </p>
          <Link href="/editor">
            <Button
              size="lg"
              className="bg-[#6C63FF] hover:bg-[#5B52FF] text-white text-lg px-8 py-6"
            >
              Launch Editor
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2D3340] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#6C63FF]" />
            <span className="font-bold font-mono">FlashCode</span>
          </div>
          <p className="text-sm text-[#ACB2BD]">
            © 2025 FlashCode. Built with Next.js & Judge0.
          </p>
        </div>
      </footer>
    </div>
  );
}
