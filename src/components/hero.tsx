"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { RESUME } from "@/data/resume";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-start space-y-8 px-4 sm:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="inline-block px-3 py-1 bg-accent/50 rounded-full border border-border">
          <span className="text-sm font-medium text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            Available for hire
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground">
          Hi, I&apos;m {RESUME.name} <br />
          <span className="text-muted-foreground">Backend Developer</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
      >
        {RESUME.about}
      </motion.p>
      
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 0.4 }}
         className="flex flex-wrap gap-4"
      >
        <Link
          href="#contact"
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "h-11 px-8"
          )}
        >
          Contact Me <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <Link
          href="/resume.pdf"
          target="_blank" 
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            "h-11 px-8"
          )}
        >
           View Resume <FileText className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  );
}
