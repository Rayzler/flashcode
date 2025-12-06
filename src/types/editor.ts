export const LANGUAGES = {
  javascript: { label: "JavaScript", icon: "🟨" },
  python: { label: "Python", icon: "🐍" },
  java: { label: "Java", icon: "☕" },
  cpp: { label: "C++", icon: "⚙️" },
  go: { label: "Go", icon: "🔵" }
} as const;

export type Language = keyof typeof LANGUAGES;

export const STARTER_CODE: Record<Language, string> = {
  javascript: `// Welcome to FlashCode!
console.log("Hello, World!");`,
  python: `# Welcome to FlashCode!
print("Hello, World!")`,
  java: `// Welcome to FlashCode!
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  cpp: `// Welcome to FlashCode!
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  go: `// Welcome to FlashCode!
package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`
};
