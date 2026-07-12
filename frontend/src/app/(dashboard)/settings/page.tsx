"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="bg-card/50 backdrop-blur-xl border-border/50">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" className="max-w-md bg-muted/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" className="max-w-md bg-muted/30" />
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50">
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Manage your Nebrix API keys for external integrations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-muted/10">
              <div>
                <p className="font-medium">Production Key</p>
                <p className="text-sm text-muted-foreground font-mono mt-1">sk_prod_*********************</p>
              </div>
              <Button variant="outline" size="sm">Reveal</Button>
            </div>
            <Button variant="outline">Generate New Key</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
