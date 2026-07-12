"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Save, Eye, Mail, FileText, Globe, LayoutTemplate } from "lucide-react";

export default function ContentStudioPage() {
  const templates = [
    { name: "Email Newsletter", icon: Mail },
    { name: "Blog Post", icon: FileText },
    { name: "Landing Page Copy", icon: Globe },
    { name: "Social Media Post", icon: LayoutTemplate },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Studio</h2>
          <p className="text-muted-foreground mt-1">Generate AI marketing content across all formats.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-full min-h-0">
        {/* Templates & Prompt Area */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 flex flex-col gap-6"
        >
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-sm flex-1">
            <div className="p-4 border-b border-border/50">
              <h3 className="font-semibold flex items-center">
                <Sparkles className="mr-2 h-4 w-4 text-primary" /> 
                AI Generator
              </h3>
            </div>
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Select Template</label>
                <div className="grid grid-cols-2 gap-2">
                  {templates.map(t => (
                    <Button key={t.name} variant="outline" className="justify-start h-auto py-2 px-3 text-xs bg-muted/20">
                      <t.icon className="mr-2 h-3 w-3" />
                      {t.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Topic / Brief</label>
                <textarea 
                  className="w-full h-32 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none custom-scrollbar" 
                  placeholder="Describe what you want to write about..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Keywords (Optional)</label>
                <Input placeholder="AI, marketing, growth..." />
              </div>
              <Button className="w-full mt-2">Generate Content</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Editor Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 h-full min-h-0 flex flex-col"
        >
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="p-2 border-b border-border/50 flex items-center gap-1 bg-muted/20">
              {/* Fake Toolbar */}
              {['H1', 'H2', 'B', 'I', 'U', 'List', 'Link'].map((tool, i) => (
                <Button key={i} variant="ghost" size="sm" className="h-8 px-2 text-xs font-medium text-muted-foreground">
                  {tool}
                </Button>
              ))}
            </div>
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              <h1 className="text-4xl font-bold mb-4 outline-none empty:before:content-['Title_here...'] empty:before:text-muted-foreground text-foreground" contentEditable></h1>
              <div className="prose prose-invert max-w-none outline-none empty:before:content-['Start_writing_or_use_AI_to_generate_content...'] empty:before:text-muted-foreground" contentEditable>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
