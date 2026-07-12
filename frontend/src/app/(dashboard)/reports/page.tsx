"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Share2, Plus, File } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { id: 1, name: "Q3 Marketing Performance", date: "Oct 12, 2026", status: "Ready", type: "PDF" },
    { id: 2, name: "Social Media ROI Analysis", date: "Oct 10, 2026", status: "Ready", type: "Excel" },
    { id: 3, name: "Weekly Campaign Summary", date: "Oct 08, 2026", status: "Ready", type: "PDF" },
    { id: 4, name: "Competitor Market Share", date: "Oct 05, 2026", status: "Generating", type: "PDF" },
  ];

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground mt-1">Generate, view, and export your marketing reports.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/30 transition-colors flex flex-col h-full">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    report.status === "Ready" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>
                    {report.status}
                  </span>
                </div>
                <CardTitle className="mt-4 text-lg">{report.name}</CardTitle>
                <CardDescription>Generated on {report.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <File className="h-4 w-4" />
                  {report.type} Format
                </div>
              </CardContent>
              <CardFooter className="pt-3 border-t border-border/50 gap-2">
                <Button variant="outline" size="sm" className="w-full bg-background/50" disabled={report.status !== "Ready"}>
                  <Download className="mr-2 h-3 w-3" /> Export
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-background/50" disabled={report.status !== "Ready"}>
                  <Share2 className="mr-2 h-3 w-3" /> Share
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
