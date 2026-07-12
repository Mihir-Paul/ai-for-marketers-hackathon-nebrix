"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', organic: 4000, paid: 2400 },
  { name: 'Tue', organic: 3000, paid: 1398 },
  { name: 'Wed', organic: 2000, paid: 9800 },
  { name: 'Thu', organic: 2780, paid: 3908 },
  { name: 'Fri', organic: 1890, paid: 4800 },
  { name: 'Sat', organic: 2390, paid: 3800 },
  { name: 'Sun', organic: 3490, paid: 4300 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground mt-1">Deep dive into your marketing performance across all channels.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-card/50 backdrop-blur-sm border-border/50">
            <Calendar className="mr-2 h-4 w-4" />
            Last 7 Days
          </Button>
          <Button variant="outline" className="bg-card/50 backdrop-blur-sm border-border/50">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <Card className="col-span-full bg-card/50 backdrop-blur-xl border-border/50">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Compare organic vs paid traffic over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#9CA3AF" tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#10141F', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  />
                  <Bar dataKey="organic" stackId="a" fill="#5B7FFF" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="paid" stackId="a" fill="#7A5FFF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
