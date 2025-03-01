"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ServiceModalProps {
  service: {
    id: number
    title: string
    description: string
    icon: string
    content: string
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ServiceModal({ service, open, onOpenChange }: ServiceModalProps) {
  if (!service) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] dark:bg-gray-900">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{service.icon}</span>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">{service.title}</DialogTitle>
          </div>
          <DialogDescription className="text-base text-gray-600 dark:text-gray-300">
            {service.description}
          </DialogDescription>
        </DialogHeader>
        <div
          className="mt-6 prose prose-gray dark:prose-invert max-w-none
            prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:text-gray-600 dark:prose-p:text-gray-300
            prose-li:text-gray-600 dark:prose-li:text-gray-300
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-h3:text-xl prose-h3:font-bold prose-h3:mb-4
            prose-p:text-base prose-p:leading-relaxed prose-p:mb-4
            prose-ul:my-4 prose-li:my-1
            [&>h3]:text-gray-900 [&>h3]:dark:text-white
            [&>p]:text-gray-600 [&>p]:dark:text-gray-300
            [&>ul]:text-gray-600 [&>ul]:dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: service.content }}
        />
        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
          >
            Stäng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

