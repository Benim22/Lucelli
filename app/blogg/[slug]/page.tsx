import { blogPosts } from "@/data/blog-posts"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Mdx } from "@/components/mdx"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <article className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-gray-600 dark:text-gray-400">{post.author.name}</span>
            </div>
            <time className="text-gray-600 dark:text-gray-400">{formatDate(new Date(post.publishedAt))}</time>
          </div>
        </div>

        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <Mdx code={post.content} />
        </div>
      </article>
    </main>
  )
}

