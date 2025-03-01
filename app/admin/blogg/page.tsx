"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { blogPosts } from "@/data/blog-posts"
import { formatDate } from "@/lib/utils"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { AdminBlogPostDialog } from "./blog-post-dialog"
import type { BlogPost } from "@/types/blog"

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(blogPosts)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post)
    setIsDialogOpen(true)
  }

  const handleDelete = (postId: string) => {
    if (confirm("Är du säker på att du vill radera detta inlägg?")) {
      setPosts(posts.filter((post) => post.id !== postId))
    }
  }

  const handleSave = (post: BlogPost) => {
    if (selectedPost) {
      // Edit existing post
      setPosts(posts.map((p) => (p.id === post.id ? post : p)))
    } else {
      // Add new post
      setPosts([...posts, { ...post, id: String(posts.length + 1) }])
    }
    setIsDialogOpen(false)
    setSelectedPost(null)
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Hantera Blogginlägg</h1>
          <Button onClick={() => setIsDialogOpen(true)}>Nytt Inlägg</Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titel</TableHead>
                <TableHead>Författare</TableHead>
                <TableHead>Publicerad</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-[100px]">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Link href={`/blogg/${post.slug}`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.author.name}</TableCell>
                  <TableCell>{formatDate(new Date(post.publishedAt))}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(post)}
                        className="hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(post.id)}
                        className="hover:text-destructive"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AdminBlogPostDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          post={selectedPost}
          onSave={handleSave}
        />
      </div>
    </main>
  )
}

