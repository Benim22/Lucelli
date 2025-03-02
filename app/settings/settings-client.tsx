"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell, Moon, Sun, Globe, Mail } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface SettingsClientProps {
  user: {
    email: string
    provider?: string
  }
}

export function SettingsClient({ user }: SettingsClientProps) {
  const { setTheme, theme } = useTheme()
  const { toast } = useToast()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  const handleNotificationChange = (checked: boolean) => {
    setEmailNotifications(checked)
    toast({
      title: "Inställningar uppdaterade",
      description: `E-postnotifieringar är nu ${checked ? "aktiverade" : "inaktiverade"}.`,
    })
  }

  const handleMarketingChange = (checked: boolean) => {
    setMarketingEmails(checked)
    toast({
      title: "Inställningar uppdaterade",
      description: `Marknadsföringsutskick är nu ${checked ? "aktiverade" : "inaktiverade"}.`,
    })
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Inställningar</h1>

        <div className="grid gap-6">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Utseende</CardTitle>
              <CardDescription>Hantera applikationens utseende</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <Label htmlFor="theme-light">Ljust läge</Label>
                </div>
                <Button variant="outline" size="sm" onClick={() => setTheme("light")} disabled={theme === "light"}>
                  Aktivera
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <Label htmlFor="theme-dark">Mörkt läge</Label>
                </div>
                <Button variant="outline" size="sm" onClick={() => setTheme("dark")} disabled={theme === "dark"}>
                  Aktivera
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <Label htmlFor="theme-system">Systemets inställning</Label>
                </div>
                <Button variant="outline" size="sm" onClick={() => setTheme("system")} disabled={theme === "system"}>
                  Aktivera
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notifieringar</CardTitle>
              <CardDescription>Hantera hur du vill bli notifierad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label htmlFor="notifications">E-postnotifieringar</Label>
                </div>
                <Switch id="notifications" checked={emailNotifications} onCheckedChange={handleNotificationChange} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <Label htmlFor="marketing">Marknadsföringsutskick</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Få information om erbjudanden och nyheter</p>
                </div>
                <Switch id="marketing" checked={marketingEmails} onCheckedChange={handleMarketingChange} />
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Kontoinformation</CardTitle>
              <CardDescription>Din kontoinformation och inställningar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>E-post</Label>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="grid gap-2">
                <Label>Inloggningsmetod</Label>
                <p className="text-sm text-muted-foreground capitalize">{user.provider || "email"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

