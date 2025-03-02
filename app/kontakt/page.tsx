"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { submitContactForm } from "@/app/actions/contact"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)

      const result = await submitContactForm(formData)

      if (result.success) {
        toast({
          title: "Meddelande skickat!",
          description: "Tack för ditt meddelande. Vi återkommer så snart som möjligt.",
        })

        // Reset form
        setName("")
        setEmail("")
        setSubject("")
        setMessage("")
      } else {
        throw new Error(result.error)
      }
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
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Kontakta Oss</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Har du frågor eller vill diskutera ett projekt? Kontakta oss så återkommer vi så snart som möjligt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Skicka ett meddelande</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Namn *</Label>
                <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-post *</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Ämne *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Meddelande *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Skickar..." : "Skicka Meddelande"}
              </Button>
            </form>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-6">Kontaktinformation</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium">Besöksadress</h3>
                    <p className="text-gray-600">Storgatan 123, 123 45 Stockholm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium">Telefon</h3>
                    <p className="text-gray-600">08-123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium">E-post</h3>
                    <p className="text-gray-600">info@lucelli.se</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium">Öppettider</h3>
                    <p className="text-gray-600">Måndag - Fredag: 09:00 - 17:00</p>
                    <p className="text-gray-600">Lördag - Söndag: Stängt</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Hitta till oss</h2>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Karta kommer att visas här</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

