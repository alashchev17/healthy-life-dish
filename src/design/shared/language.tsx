"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type LanguageCode = "ukr" | "eng" | "esp";

export type Language = {
  name: string;
  code: LanguageCode;
};

export const LANGUAGES: Language[] = [
  {
    name: "English",
    code: "eng",
  },
  {
    name: "Spanish",
    code: "esp",
  },
  {
    name: "Ukrainian",
    code: "ukr",
  },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  languages: Language[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      try {
        const parsedLanguage = JSON.parse(savedLanguage);
        const validLanguage = LANGUAGES.find(
          (lang) => lang.code === parsedLanguage.code,
        );
        if (validLanguage) {
          setCurrentLanguage(validLanguage);
          return;
        }
      } catch (e) {
        console.error("Error parsing saved language", e);
      }
    }

    setCurrentLanguage(LANGUAGES[0]);
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", JSON.stringify(language));
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage: currentLanguage ?? DEFAULT_LANGUAGE,
        setLanguage,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
