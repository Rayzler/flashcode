"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Language, LANGUAGES } from "@/types/editor";

interface LanguageSelectorProps {
  value: Language;
  onChange: (value: Language) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as Language)}>
      <SelectTrigger className="w-[180px] bg-[#1C2229] border-[#2D3340] text-[#E6E8EB] hover:bg-[#1C2229]/80 hover:border-[#6C63FF]/50 transition-colors">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-[#14181F] border-[#2D3340]">
        {Object.entries(LANGUAGES).map(([key, lang]) => (
          <SelectItem
            key={key}
            value={key}
            className="text-[#E6E8EB] hover:bg-[#1C2229] hover:text-white focus:bg-[#1C2229] focus:text-white cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{lang.icon}</span>
              <span>{lang.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
