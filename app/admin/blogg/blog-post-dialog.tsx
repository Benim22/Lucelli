"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { BlogPost } from "@/types/blog"
import { useEffect, useState } from "react"

interface AdminBlogPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: BlogPost | null
  onSave: (post: BlogPost) => void
}

export function AdminBlogPostDialog({ open, onOpenChange, post, onSave }: AdminBlogPostDialogProps) {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    publishedAt: new Date().toISOString().split("T")[0],
    author: {
      name: "",
      avatar: "",
    },
    tags: [],
  })

  useEffect(() => {
    if (post) {
      setFormData(post)
    } else {
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        publishedAt: new Date().toISOString().split("T")[0],
        author: {
          name: "",
          avatar: "",
        },
        tags: [],
      })
    }
  }, [post])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as BlogPost)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith("author.")) {
      const field = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          [field]: value,
        },
      }))
    } else if (name === "tags") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((tag) => tag.trim()),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{post ? "Redigera Inlägg" : "Nytt Inlägg"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titel</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Utdrag</Label>
            <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Innehåll (Markdown)</Label>
            <Textarea id="content" name="content" value={formData.content} onChange={handleChange} required rows={10} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Omslagsbild URL</Label>
            <Input id="coverImage" name="coverImage" value={formData.coverImage} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publishedAt">Publiceringsdatum</Label>
            <Input
              id="publishedAt"
              name="publishedAt"
              type="date"
              value={formData.publishedAt}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author.name">Författarens namn</Label>
            <Input id="author.name" name="author.name" value={formData.author?.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author.avatar">Författarens avatar URL</Label>
            <Input
              id="author.avatar"
              name="author.avatar"
              value={formData.author?.avatar}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (kommaseparerade)</Label>
            <Input id="tags" name="tags" value={formData.tags?.join(", ")} onChange={handleChange} required />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Avbryt
            </Button>
            <Button type="submit">Spara</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

