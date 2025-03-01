"use client"

import { blogPosts } from "@/data/blog-posts"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Blogg</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upptäck de senaste insikterna inom webutveckling, design och digital marknadsföring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/blogg/${post.slug}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{post.author.name}</span>
                    </div>
                    <time className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(new Date(post.publishedAt))}
                    </time>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  )
}

