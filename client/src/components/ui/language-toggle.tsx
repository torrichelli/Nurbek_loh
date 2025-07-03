import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { setLanguage, getLanguage, type Language } from "@/lib/i18n";

export function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState<Language>("kk");

  useEffect(() => {
    setCurrentLang(getLanguage());
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCurrentLang(lang);
    // Force re-render to update translations
    window.location.reload();
  };

  return (
    <div className="flex bg-white/10 lg:bg-gray-100 rounded-lg p-1">
      <Button
        variant={currentLang === "kk" ? "default" : "ghost"}
        size="sm"
        onClick={() => handleLanguageChange("kk")}
        className={`px-3 py-1 text-xs font-medium touch-target ${
          currentLang === "kk"
            ? "bg-yellow-400 text-blue-900 hover:bg-yellow-500"
            : "text-white/70 lg:text-gray-600 hover:text-white lg:hover:text-gray-900"
        }`}
      >
        ҚАЗ
      </Button>
      <Button
        variant={currentLang === "ru" ? "default" : "ghost"}
        size="sm"
        onClick={() => handleLanguageChange("ru")}
        className={`px-3 py-1 text-xs font-medium touch-target ${
          currentLang === "ru"
            ? "bg-yellow-400 text-blue-900 hover:bg-yellow-500"
            : "text-white/70 lg:text-gray-600 hover:text-white lg:hover:text-gray-900"
        }`}
      >
        РУС
      </Button>
    </div>
  );
}
