"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, File as FileIcon, X, CheckCircle2 } from "lucide-react";
import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function UploadsPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<{name: string, size: string, status: 'uploading' | 'completed'}[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(f => ({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
        status: 'completed' as const
      }));
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} files uploaded and indexed by AI.`);
    }
  };

  return (
    <div className="flex-1 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upload Center</h2>
        <p className="text-muted-foreground mt-1">Upload marketing documents, assets, and data for AI indexing.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className={`border-2 border-dashed ${isDragging ? 'border-primary bg-primary/5' : 'border-border/50 bg-card/50'} backdrop-blur-xl transition-colors duration-300`}>
          <CardContent 
            className="flex flex-col items-center justify-center py-24 text-center"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="p-4 bg-primary/10 rounded-full mb-6">
              <UploadCloud className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Drag & drop files here</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Support for PDF, CSV, Excel, Word, and Images. AI will automatically parse and index your documents.
            </p>
            <Button variant="secondary" className="px-8">
              Browse Files
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {files.length > 0 && (
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-semibold">Recent Uploads</h3>
          <div className="space-y-3">
            {files.map((file, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i}
                className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Indexed
                  </span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
