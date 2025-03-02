"use client"

import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  placeholder?: string
}

export function CodeEditor({ value, onChange, language = "sql", placeholder }: CodeEditorProps) {
  const { theme } = useTheme()

  return (
    <Editor
      height="300px"
      defaultLanguage={language}
      value={value}
      onChange={(value) => onChange(value ?? "")}
      theme={theme === "dark" ? "vs-dark" : "light"}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        roundedSelection: true,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 16 },
      }}
    />
  )
}

