"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Calendar, ArrowRight } from "lucide-react";

export default function CampaignsPage() {
  const columns = [
    { title: "Planning", items: ["Q4 Product Launch", "Holiday Email Series"] },
    { title: "Active", items: ["SaaS Retargeting Ad", "LinkedIn Brand Awareness"] },
    { title: "Review", items: ["October Newsletter"] },
    { title: "Completed", items: ["Webinar Promotion", "Summer Sale"] },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
          <p className="text-muted-foreground mt-1">Manage your marketing campaigns in a kanban board.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map((col, i) => (
            <motion.div 
              key={col.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-80 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between px-1">
                <h3 className="font-semibold">{col.title}</h3>
                <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-medium">{col.items.length}</span>
              </div>
              
              <div className="flex-1 space-y-3 bg-muted/10 rounded-2xl p-2 border border-border/30">
                {col.items.map((item, j) => (
                  <Card key={j} className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 cursor-grab active:cursor-grabbing transition-colors shadow-sm">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-2">Campaign</div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-2 text-muted-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-base font-semibold">{item}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          Oct 24 - Nov 15
                        </div>
                        <div className="flex items-center text-primary font-medium group cursor-pointer">
                          View <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
