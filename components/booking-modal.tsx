"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { sv } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { createMeeting } from "@/app/actions/meetings" // Fixed import path

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BookingModal({ open, onOpenChange }: BookingModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [service, setService] = useState("")
  const [date, setDate] = useState<Date | undefined>()
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      formData.set("date", date?.toISOString() || "")

      const result = await createMeeting(formData)

      if (result.success) {
        toast({
          title: "Möte bokat!",
          description: "Vi kommer att kontakta dig inom kort för att bekräfta ditt möte.",
        })

        // Reset form
        setName("")
        setEmail("")
        setPhone("")
        setCompany("")
        setService("")
        setDate(undefined)
        setMessage("")

        // Close modal
        onOpenChange(false)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Det gick inte att boka mötet. Försök igen senare.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col">
        <div className="sticky top-0 z-50 bg-background pt-6 pb-4">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-6 top-6 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Stäng</span>
          </button>
          <DialogHeader>
            <DialogTitle className="text-2xl">Boka ett möte</DialogTitle>
            <DialogDescription>
              Fyll i formuläret nedan för att boka ett möte med vårt team. Vi återkommer så snart som möjligt.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Företag</Label>
                <Input id="company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Tjänst *</Label>
                <Select required value={service} name="service" onValueChange={setService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj tjänst" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webutveckling">Webutveckling</SelectItem>
                    <SelectItem value="grafisk-design">Grafisk Design</SelectItem>
                    <SelectItem value="ai-losningar">AI-lösningar</SelectItem>
                    <SelectItem value="seo">SEO-optimering</SelectItem>
                    <SelectItem value="digital-marknadsforing">Digital Marknadsföring</SelectItem>
                    <SelectItem value="e-handel">E-handel</SelectItem>
                    <SelectItem value="annat">Annat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Önskat datum *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: sv }) : "Välj ett datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={sv} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Meddelande</Label>
              <Textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" variant="shimmer" disabled={isSubmitting}>
                {isSubmitting ? "Skickar..." : "Boka Möte"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

