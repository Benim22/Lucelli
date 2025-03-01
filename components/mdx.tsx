"use client"

import { cn } from "@/lib/utils"
import { useMemo } from "react"
import Markdown from "react-markdown"

interface MdxProps {
  code: string
  className?: string
}

export function Mdx({ code, className }: MdxProps) {
  const Component = useMemo(() => {
    return function Component() {
      return (
        <Markdown
          className={cn(
            "prose prose-gray dark:prose-invert max-w-none",
            "prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100",
            "prose-p:text-gray-600 dark:prose-p:text-gray-300",
            "prose-li:text-gray-600 dark:prose-li:text-gray-300",
            "prose-strong:text-gray-900 dark:prose-strong:text-gray-100",
            className,
          )}
        >
          {code}
        </Markdown>
      )
    }
  }, [code, className])

  return <Component />
}

