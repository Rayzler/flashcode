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
      <SelectTrigger className="w-[180px] bg-[#1C2229] border-[#2D3340]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(LANGUAGES).map(([key, lang]) => (
          <SelectItem key={key} value={key}>
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
