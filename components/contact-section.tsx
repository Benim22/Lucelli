"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, this would send data to Supabase
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Meddelande skickat!",
        description: "Tack för ditt meddelande. Vi återkommer så snart som möjligt.",
      })

      // Reset form
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Det gick inte att skicka meddelandet. Försök igen senare.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Kontakta Oss</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Har du frågor eller vill diskutera ett projekt? Kontakta oss så återkommer vi så snart som möjligt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Skicka ett meddelande</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Namn *</Label>
                <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">E-post *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Meddelande *</Label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" variant="shimmer" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Skickar..." : "Skicka Meddelande"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">Kontaktinformation</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium">Adress</h4>
                    <p className="text-gray-600">Storgatan 123, 123 45 Stockholm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium">Telefon</h4>
                    <p className="text-gray-600">08-123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium">E-post</h4>
                    <p className="text-gray-600">info@lucelli.se</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Öppettider</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Måndag - Fredag</span>
                  <span>09:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Lördag - Söndag</span>
                  <span>Stängt</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

